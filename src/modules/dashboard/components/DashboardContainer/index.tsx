import React from "react";

import { ScrollView } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

import { Button, Container } from "@/common/components";

import Navbar from "../Navbar";
import RecentTrans from "../RecentTrans";
import Stats from "../Stats";

const DashboardContainer = () => {
  return (
    <ScrollView>
      <Container style={{ gap: 16 }}>
        <Navbar />
        <Stats />

        <Button
          variant="light"
          leftIcon={(style) => (
            <FeatherIcon name="plus" style={style} size={16} />
          )}
        >
          Tambah Catatan
        </Button>

        <RecentTrans />
      </Container>
    </ScrollView>
  );
};

export default DashboardContainer;
