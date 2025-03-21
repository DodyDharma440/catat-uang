import React from "react";

import { withAuth } from "@/common/hocs";
import { TransDetail } from "@/modules/transactions/components";

const DetailTransScreen = () => {
  return <TransDetail backHref="/calendar" />;
};

export default withAuth(DetailTransScreen);
