import React from "react";

import IonIcon from "react-native-vector-icons/Ionicons";

import { Input } from "@/common/components";

const Search = () => {
  return (
    <Input
      leftContent={<IonIcon name="search" size={18} />}
      placeholder="Cari transaksi..."
    />
  );
};

export default Search;
