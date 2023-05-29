import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container : (transac) => ({
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: transac.type === "retrait" ? "#90EE90" : "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    marginTop: 5
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
    alignContent: "flex-start",
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
    width: 150

  },
  tontineAmount: {
    fontSize: SIZES.small,
    fontWeight: 500,
    color: COLORS.primary,
    paddingTop: 20,
    paddingLeft: 40

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
    marginTop: 50,
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

  detailContianer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: "space-around",
    display:'flex',
    gap: 10,
    left: 0
 
    
  },
  detailText: {
    alignItems: 'center',
    alignSelf: 'center'
  },
  touchable : {
    marginTop: 15,
    alignItems: 'center',
    alignSelf: 'center'
  }
});

export default styles;
