import { StyleSheet, Platform } from "react-native";
import { SolidColors } from "../const/Colors";
import { Layout } from "../const/Layout";

export default DropdownStyle = StyleSheet.create({
  header: {
    ...Platform.select({
      ios: {
        shadowColor: SolidColors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderColor: SolidColors.borderColor,
        // borderRadius: Layout.borderRadisComponent,
        elevation: 4
      }
    }),
  },
  menuItem: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 5
      }
    }),
  },
  component: {
    ...Platform.select({
      ios: {
        shadowColor: SolidColors.grey,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
      },
      android: {
        borderWidth: Layout.borderWidthDefault * 2,
        borderColor: SolidColors.borderColor,
      }
    }),
  },
  buttonSmall: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 5
      }
    }),
  },
});