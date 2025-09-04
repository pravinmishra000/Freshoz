import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { firebaseConfig } from '../src/lib/firebase.config';
import { products } from '../src/lib/data'; // ✅ Your product array

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadProducts() {
  for (const product of products) {
    try {
      await setDoc(doc(db, 'products', product.id), product);
      console.log(`✅ Uploaded: ${product.name_en}`);
    } catch (error) {
      console.error(`❌ Failed to upload ${product.name_en}:`, error);
    }
  }
}

uploadProducts();