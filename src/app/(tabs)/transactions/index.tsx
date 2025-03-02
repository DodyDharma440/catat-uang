import React from "react";

import { withAuth } from "@/common/hocs";
import { TransContainer } from "@/modules/transactions/components";

const TransactionsScreen = () => {
  return <TransContainer />;
};

export default withAuth(TransactionsScreen);
