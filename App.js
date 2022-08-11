import React, { useState } from "react";

import { SafeAreaView, StyleSheet, View, Text, TextInput, FlatList, SectionList, TextStyle, Button, TouchableOpacity, Alert, Keyboard } from "react-native";
import ICON from "react-native-vector-icons/MaterialIcons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { isTemplateExpression } from "typescript";
import { ListItem } from 'react-native-elements';


const COLORS = {primary: '#1f145c', white: '#fff', yellow: '#ffff00', green: '#7CFC00', red: '#8B0000'};

const App = () => {
  const [textInput, setTextInput] = React.useState('');

  const [tdlists, setTdlists] = React.useState([
    {id: 1, task: 'First tdlist', complete: true},
    {id: 2, task: 'Second tdlist', complete: true},
  ]);
  const [KeyboardStatus, setKeyboardStatus] = useState(undefined)
  
  const ListItem = ({tdlist}) => {
    return <View style={styles.listItem}>
      <View style={{ flex: 1}}>
        <Text style={{fontSize: 20, color: COLORS.primary}}>
        {tdlist?.task}
        </Text>
      </View>
      {!tdlist?.completed && (
        <TouchableOpacity  style={[styles.actionText]} onPress={() => markTdlistComplete(tdlist?.id)}>
          <Text style={{fontSize:20}}>☑</Text>
        </TouchableOpacity>
      )}
       <TouchableOpacity  style={[styles.actionText]} onPress={() => deleteTdlist(tdlist?.id)}>
          <Text style={{color: COLORS.red, fontSize:20 }} >
          ☒
          </Text>
       </TouchableOpacity>
      
      
    </View>;
  };

  const deleteTdlist = (tdlistId) => {
    const newTdlists = tdlists.filter(item => item.id != tdlistId);
    setTdlists(newTdlists)
  };

  const addTdlist = ()=>{
    if(textInput == ''){
      Alert.alert('Teneg yumuu', 'Yum bicheech');
    }else{
      const newTdlist = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setTdlists([newTdlist, ...tdlists, ]);
      setTextInput('');
      setKeyboardStatus(Keyboard.dismiss);
    }
  };

  const markTdlistComplete = tdlistId => {
    const newTdlists = tdlists.map(item => {
      if(item.id == tdlistId){
        return {...item, completed:true};
      }
      return item;
    });
    setTdlists(newTdlists);
  };

 
    return (
      <SafeAreaView 
      style={{flex: 1, backgroundColor: '#212121'}}>
        <View style={styles.header}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: COLORS.white}}>
             TO DO LIST
            </Text>
        </View>
        {/* <FlatList 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{padding:20, paddingBottom: 100}}
            data={tdlists} renderItem={({item})=><ListItem tdlist={item}/>}></FlatList> */}
          <View style={styles.mainContainer}>
               {tdlists.map((tdlist, key)=>{ 
                return <View style={styles.listItem}  key={key}>
                  <Text style={{ fontSize: 18, color: COLORS.white}}>{tdlist.task}</Text>
                  <View style={styles.textStyle}>
                  {!tdlist?.completed && (
                       <TouchableOpacity style={{ marginHorizontal: 16}}  onPress={() => markTdlistComplete(tdlist?.id)}>
                    <Text style={{ color: COLORS.green,fontSize:30}}>☑</Text>
                  </TouchableOpacity>
                )}
                 <TouchableOpacity  style={[styles.actionText]} onPress={() => deleteTdlist(tdlist?.id)}>
                    <Text style={{color: COLORS.red, fontSize:30}} >
                    ☒
                    </Text>
                 </TouchableOpacity>
                  </View>
                   
                </View>
               }
               
               )}
               
          </View>
        <View style={styles.footer}>
            <View style={styles.listInput}>
                <TextInput
                placeholder="Jagsaaltaa hiichih" 
                placeholderTextColor={COLORS.white}
                value={textInput}
                onChangeText={text =>setTextInput(text)} 
                style={{color: COLORS.white}} />   
            </View>
            <TouchableOpacity style={styles.button} onPress={addTdlist}>
              <Text style={{color: COLORS.white}}>
               Add
              </Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>);
   
};


const styles = StyleSheet.create({

  textStyle: {
     fontSize: 12,
     fontWeight: 23,
     flexDirection: 'row',
     color: COLORS.primary
  },

  mainContainer: {
     flex: 1,
     margin: 10
  },
  listItem: {
     backgroundColor: '#424242',
     elevation: 20,
     borderRadius: 7,
     marginVertical: 5,
     alignItems: 'center',
     justifyContent: 'space-between',
     flexDirection: 'row',
     padding: 16,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    backgroundColor: '#424242'

  },
  footer: {
    position: 'absolute',
    bottom: 30,
    color: 'COLORS.white',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#424242',
  },
  listInput: {
    color: COLORS.white,
    backgroundColor: '#424242',
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
  }
});

export default App;

