import admin from "firebase-admin";
import { collection, getDocs } from "firebase/firestore"; 
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../privi.json" assert { type: "json" };


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = getFirestore();


class ContenedorFirebase {
    constructor(nombreColeccion) {
        this.collection = db.collection(nombreColeccion);

    }


    getAll = async (id) => {
        try {
          if(id){
            let carrito = []
            const querySnapshot = await this.collection.get();
            // let docs = querySnapshot.docs;
            querySnapshot.forEach(doc => {
              console.log(doc.id, ' => ', doc.data());
              carrito.push(doc.data());
             });
            
            return carrito[0]
          }
          else
          {
            let productos = []
            const querySnapshot = await this.collection.get();
            querySnapshot.forEach(doc => {
              console.log(doc.id, ' => ', doc.data());
              productos.push(doc.data());
             });
            
            return productos         
          }

        } catch (e) {
            console.log(e);

        }
    }


    save = async (nuevoElem) => {
        try {
            const objects = await this.getAll();
            const lastElement = objects[objects.length - 1];

            const lastId = parseInt(lastElement.id) + 1;

            let doc = this.coleccion.doc(lastId);

            const object = {
                ...nuevoElem,
                date: new Date().toLocaleDateString(),
                id: parseInt(lastId),
            };

            await doc.create(object);

        } catch (e) {
            console.log(e);
        }
    }

    getById = async (id) => {
        try {
            const doc = this.coleccion.doc(id)
            const object = await doc.get();
            const response = object.data();
            console.log(response);
            return response;

        } catch (e) {
            console.log(e);
        }
    }

    updateById = async (nuevoElem, id) => {
        try {
            const doc = this.colection.doc(id);
            const object = await doc.update({ ...nuevoElem });
            console.log(object);
            console.log(`Se actualizo el objeto con el id: ${id}`);
            return object;

        } catch (e) {
            console.log(e);
        }
    }

    deleteById = async (id) => {
        try {
            const doc = this.coleccion.doc(id);
            const object = await doc.delete();
            console.log(`Se borro el documento con el id: ${id}`);
            return object;

        } catch (e) {
            console.log(e);
        }
    }

    deleteAll = async () => {
        try {
            const doc = this.coleccion.doc();
            const object = await doc.delete();
            return object;

        } catch (e) {
            console.log(e);
        }
    }



}


export default ContenedorFirebase;

