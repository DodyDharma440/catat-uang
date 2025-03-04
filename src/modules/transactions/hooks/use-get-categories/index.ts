import { useEffect, useState } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "firebase-config";

import { useUserAuth } from "@/modules/auth/contexts";

import type { ICategory, TransactionType } from "../../interfaces";

type UseGetCategoriesProps = {
  transType: TransactionType;
};

export const useGetCategories = ({ transType }: UseGetCategoriesProps) => {
  const { user } = useUserAuth();
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const handleGetCategories = async () => {
      const collectionRef = collection(
        db,
        transType === "income" ? "income_categories" : "categories"
      );
      const qAll = query(collectionRef, where("userId", "==", ""));
      const qUser = query(collectionRef, where("userId", "==", user?.uid));

      const _categories: ICategory[] = [];

      try {
        const querySnapshot = await getDocs(qAll);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          _categories.push({
            ...(data as ICategory),
            id: doc.id,
          });
        });

        const querySnapshotUser = await getDocs(qUser);
        querySnapshotUser.forEach((doc) => {
          const data = doc.data();
          _categories.push({
            ...(data as ICategory),
            id: doc.id,
          });
        });

        _categories.sort(
          (a, b) => ((a.name > b.name) as any) - ((a.name < b.name) as any)
        );

        const otherIndex = _categories.findIndex((c) => c.name === "Lainnya");
        if (otherIndex !== -1) {
          _categories.push(_categories.splice(otherIndex, 1)[0]);
        }

        setCategories(_categories);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("🚀 ~ handleGetCategories ~ error:", error);
      }
    };

    handleGetCategories();
  }, [transType, user?.uid]);

  return { categories };
};
