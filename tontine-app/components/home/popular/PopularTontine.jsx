import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./populartontine.style";
import { COLORS, SIZES } from "../../../constants";
import PopularTontineCard from "../../common/cards/popular/PopularTontineCard";

import { useIsFocused } from "@react-navigation/native";
// import { useGetTontineByNameQuery } from "../../../reducers/api/TontineApi";
import { useSelector } from "react-redux";
import { useGetTontineQuery } from "../../../reducers/api/tontineApi";
import { useGetPaymentQuery } from "../../../reducers/api/paymentApi";

const PopularTontines = ({currentUser}) => {
  const router = useRouter();
  const isFocused = useIsFocused()
  const [selectedTontine, setSelectedTontine] = useState();
  const stateData = useSelector((state) => state.Tontines);
  const { data, isLoading, refetch: refetchTontine, isFetching, isError } = useGetTontineQuery({}, { refetchOnMountOrArgChange: true });
  const { data: paymentData, refetch } = useGetPaymentQuery({}, { refetchOnMountOrArgChange: true });
  // const { data, isLoading, error, refetch } = useGetTontineByNameQuery({search: "search", query: {
  //   query: "React developer",
  //   num_pages: 1,
  // }});

  // const isLoading = false;
  // const error = null;

  // const accountData = {
  //   "data" : [
  //     {
  //         "id" : "41254454",
  //         "title": "Compte Courant",
  //         "solde": "259400",
  //         "type": "account"
  //   },
  //   {
  //     "id" : "41254455",
  //     "title": "Versement Périodique",
  //     "payment_done": "50000",
  //     "payment_pending" : "20000"
  //   },
  //   {
  //     "id" : "41254458",
  //     "title": "Versement Périodique",
  //     "payment_done": "25000",
  //     "payment_pending" : "150000"
  //   },
  //   {
  //     "id" : "41254459",
  //     "title": "Versement Périodique",
  //     "payment_done": "85000",
  //     "payment_pending" : "5000"
  //   },
  //   {
  //     "id" : "41254460",
  //     "title": "Versement Périodique",
  //     "payment_done": "250000",
  //     "payment_pending" : "20000"
  //   },
  // ]
  // }
  const handleCardPress = (item) => {
    router.push(`/tontine-details/${item.id}`);
    setSelectedTontine(item.id);
  };

  useEffect(() => {
    refetch()
    refetchTontine()
   
  }, [isFocused, paymentData])

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mon compte</Text>
        <TouchableOpacity onPress={() => router.push("/accountList")}>
          <Text style={styles.headerBtn}>Plus</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : isError ? (
          <Text> Erreur lors du traitement des données </Text>
        ) : data?.data.length === 0 ? (
          <>
            <Text> Vous n'êtes inscrit à aucune tontine</Text>
            <TouchableOpacity onPress={() => router.push("/accountList")}>
              <Text style={styles.headerBtn}> Voir les Tontines</Text>
            </TouchableOpacity>
          </>
        ) : (
          <FlatList
            data={data?.data}
            renderItem={({ item }) => (
              <PopularTontineCard
                selectedTontine={selectedTontine}
                item={item}
                handleCardPress={handleCardPress}
                payments={paymentData?.data}
                currentUser={currentUser}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default PopularTontines;
