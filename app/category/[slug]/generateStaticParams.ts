import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBr5HPQl5rMKi0d74blxYuBcDUfoyUF7fk',
  projectId: 'freshoz-fresh-fast',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, 'categories'));
  return snapshot.docs.map((doc) => ({
    slug: doc.data().slug,
  }));
}