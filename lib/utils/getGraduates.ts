import * as admin from 'firebase-admin';
import type { Graduate } from 'lib/types/Graduate';
import 'lib/utils/initFirebase';

const db = admin.firestore();

const getGraduates = async (): Promise<Graduate[]> => {
  const batch = parseInt(process.env.NEXT_PUBLIC_GRADUATE_BATCH, 10);
  try {
    const congregationListRef = db.collection('congregation_list').where('batch', '==', batch).where('deletedAt', '==', null).orderBy('name')
      .select('name');
    const congregationListResponse = await congregationListRef.get();
    const congregationListData = congregationListResponse.docs.map((doc) => {
      const { id } = doc;
      const { name } = doc.data();
      return {
        id,
        name,
      };
    });
    return congregationListData;
  } catch (e) {
    throw new Error('Unable to get graduates');
  }
};

export default getGraduates;
