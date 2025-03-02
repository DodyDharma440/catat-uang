import React, { useMemo } from "react";

import { ScrollView } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

import { Link } from "expo-router";

import { Button, Container, Typography } from "@/common/components";
import { useUserAuth } from "@/modules/auth/contexts";

import Navbar from "../Navbar";
import RecentTrans from "../RecentTrans";
import Stats from "../Stats";

const DashboardContainer = () => {
  const { user } = useUserAuth();

  const displayName = useMemo(() => {
    return user?.displayName?.split(" ").slice(0, 2).join(" ");
  }, [user?.displayName]);

  return (
    <ScrollView>
      <Container style={{ gap: 12 }}>
        <Navbar />
        <Typography fontWeight="700" style={{ fontSize: 24 }}>
          Halo, {displayName}!
        </Typography>
        <Stats />

        <Link href="/transactions/add" asChild>
          <Button
            variant="light"
            leftIcon={(style) => (
              <FeatherIcon name="plus" style={style} size={16} />
            )}
          >
            Tambah Catatan
          </Button>
        </Link>

        <RecentTrans />
      </Container>
    </ScrollView>
  );
};

export default DashboardContainer;
