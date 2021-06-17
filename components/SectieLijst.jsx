import React from 'react'
import { StyleSheet, View,SectionList } from 'react-native'


const SectieLijst = ({data,renderItem,renderItemHeader }) => {
    return (
          <View>
              <SectionList
                sections={data}
                renderItem={renderItem}
                renderSectionHeader={renderItemHeader}
                keyExtractor={item => item.id}
                />
          </View>
      );
    }

export default SectieLijst

