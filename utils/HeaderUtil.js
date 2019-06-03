import React            from 'react';
import { Ionicons }     from '@expo/vector-icons';
import { Layout }       from '../const/Layout';
import { SolidColors }  from '../const/Colors';

export const createNavigationOptions = (title, backgroundColor, headerTintColor, fontWeight) => {
  const options = {
    title: title,
    headerStyle: {
      backgroundColor: backgroundColor,
    },
    headerTintColor: headerTintColor,
    headerTitleStyle: {
      fontWeight: fontWeight,
    },
  }

  return options;
}

export const createHomeNavigationOptions = () => {
  const options = {
    title: 'Trang chủ',
    headerLeft: (
      <Ionicons
        name='ios-home'
        size={28}
        color='white'
        style={{
          marginLeft: Layout.marginPaddingDefault * 2
        }}
      />
    )
  }

  return options;
}

export const createSubNavigationOptions = (title) => {
  const options = {
    title: title,
    headerStyle: {
      backgroundColor: SolidColors.appBarColor,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }

  return options;
}

export const createCSKHNavigationOptions = ({ navigation }) => ({
  title: `${navigation.state.params.title}`,
  headerStyle: {
    backgroundColor: SolidColors.appBarColor,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  }
});

export const createNullNavigationOptions = () => {
  const options = {
    header: null
  }

  return options;
}

export default {
  createHomeNavigationOptions,
  createNavigationOptions,
  createSubNavigationOptions,
  createNullNavigationOptions,
  createCSKHNavigationOptions
}