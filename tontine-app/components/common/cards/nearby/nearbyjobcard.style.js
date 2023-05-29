import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container : (transac) => ({
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: transac.attributes.type === "retrait" ? "#90EE90" : "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: "space-between",
    display:'flex'
  },
  jobName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
    width: 90
  },
  tontineName: {
    fontSize: SIZES.small,
    fontFamily: "DMBold",
    color: COLORS.primary,
    paddingTop: 20,
    width: 200

  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: SIZES.small,
    position: 'absolute',
    bottom: 0, 
    paddingTop: 50,
    marginLeft : 20
  },
  jobType: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
  date: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
    flexWrap: "wrap",
    alignSelf: "flex-end"
  
  },
});

export default styles;
