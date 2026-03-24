// week10/_services/shopping-list-service.ts

import { db } from "../_utils/firebase";
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc,
  doc,
  DocumentData,
  QuerySnapshot
} from "firebase/firestore";
import { Item, ItemInput } from "../Shoppinglist/types"; // Import from your existing types

/**
 * Get all items for a specific user from Firestore
 */
export async function getItems(userId: string): Promise<Item[]> {
  try {
    const itemsCollection = collection(db, "users", userId, "items");
    const itemsSnapshot: QuerySnapshot<DocumentData> = await getDocs(itemsCollection);
    
    const items: Item[] = [];
    itemsSnapshot.forEach((doc) => {
      const data = doc.data();
      items.push({
        id: doc.id,
        name: data.name,
        quantity: data.quantity,
        category: data.category,
      });
    });
    
    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}

/**
 * Add a new item to a user's shopping list in Firestore
 */
export async function addItem(
  userId: string, 
  item: ItemInput
): Promise<string> {
  try {
    const itemsCollection = collection(db, "users", userId, "items");
    const docRef = await addDoc(itemsCollection, {
      name: item.name,
      quantity: item.quantity,
      category: item.category,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding item:", error);
    throw new Error("Failed to add item");
  }
}

/**
 * Delete an item from a user's shopping list in Firestore
 */
export async function deleteItem(
  userId: string, 
  itemId: string
): Promise<boolean> {
  try {
    const itemRef = doc(db, "users", userId, "items", itemId);
    await deleteDoc(itemRef);
    return true;
  } catch (error) {
    console.error("Error deleting item:", error);
    return false;
  }
}