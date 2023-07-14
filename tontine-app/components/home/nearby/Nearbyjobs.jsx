import { useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import { useIsFocused } from "@react-navigation/native";
import { useGetPaymentQuery } from "../../../reducers/api/paymentApi";




const Nearbyjobs = ({currentUser}) => {
  const router = useRouter();
  const isFocused = useIsFocused();
  const {data, isLoading, refetch, isSuccess, isError} = useGetPaymentQuery({}, { refetchOnMountOrArgChange: true })



  const myTransactions = data?.data.filter(tr => tr?.attributes.user.data?.id === currentUser?.user?.id)



  useEffect(() => {
    refetch()
  
   
  }, [isFocused])
  
 
  return (
    <View style={styles.container}>
  
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity onPress={() => router.push('/transactionsList')}>
          <Text style={styles.headerBtn}>Plus</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : isError ? (
          <Text> Erreur lors du traitement des données </Text>
        ) : myTransactions?.length === 0 ? (
          <>
          <>
            <Text> Vous n'avez pas encore effectué de transaction</Text>
            {/* <TouchableOpacity onPress={() => router.push("/accountList")}>
              <Text style={styles.headerBtn}> Voir les Tontines</Text>
            </TouchableOpacity> */}
          </>
          </>
        ) : (
          myTransactions?.map((transac) => (
            <NearbyJobCard
              transac={transac}
              key={`nearby-job-${transac?.id}`}
              handleNavigate={() => router.push(`/transaction-details/${transac?.id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
