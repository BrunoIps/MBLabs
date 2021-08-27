import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons';


import Colors from '../../../constants/Colors';


const CustomHeaderButton = props => {
  return <HeaderButton {...props} IconComponent={Ionicons} iconSize={30} color={Colors.secondary} />
}

export default CustomHeaderButton;

