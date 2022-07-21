import React, {useState, useCallback} from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Platform,
  PermissionsAndroid,
  Alert,
  Modal,
  Animated,
} from 'react-native';

import Header from '../screens/components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker';

import DocumentPicker from 'react-native-document-picker';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

//

const Profile = ({navigation}) => {
  const [filePath, setFilePath] = useState(undefined);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response camera = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        // console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.assets[0].uri);
        console.log('width -> ', response.assets[0].width);
        console.log('height -> ', response.assets[0].height);
        console.log('fileSize -> ', response.assets[0].fileSize);
        console.log('type -> ', response.assets[0].type);
        console.log('fileName -> ', response.assets[0].fileName);
        setFilePath(response);
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 200,
      maxHeight: 200,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response file picker = ', response);
      if (response.didCancel) {
        alert('User cancel gallery');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      // console.log('base64 -> ', response.assets[0].base64);
      console.log('uri -> ', response.assets[0].uri);
      console.log('width -> ', response.assets[0].width);
      console.log('height -> ', response.assets[0].height);
      console.log('fileSize -> ', response.assets[0].fileSize);
      console.log('type -> ', response.assets[0].type);
      console.log('fileName -> ', response.assets[0].fileName);

      setFilePath(response);
    });
  };

  ////Dtae Picker
  const [date, setDate] = useState(new Date());

  const createThreeButtonAlert = () =>
    Alert.alert('Alert!', 'Upload Your photo', [
      {
        text: 'Gallery',
        onPress: () => chooseFile('photo'),
      },
      {
        text: 'Camera',
        onPress: () => {
          captureImage('photo');
        },
        // style: 'cancel',
      },
      // {text: 'OK', onPress: () => chooseFile('photo')},
    ]);

  ///// document picler code
  const [singleFile, setSingleFile] = useState('');

  const selectOneFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      //Printing the log realted to the file
      // console.log('uri -> ', response.assets[0].uri);
      console.log('res : ' + JSON.stringify(res));
      // console.log('URI : ' + res.fileCopyUri[0].uri);
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      //Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      {/* <View>
      <Text>Saufik</Text>
     </View>
    */}

      {/* <View style={styles.header} /> */}
      <View style={styles.header}>
        {/*


        {/* <View style={styles.avatar}> */}
        {filePath && (
          <Image
            source={{uri: filePath?.assets[0]?.uri}}
            style={styles.avatar}
          />
        )}

        <TouchableOpacity
          style={{
            marginLeft: 203,
            backgroundColor: 'white',
            height: 30,
            width: 30,
            borderRadius: 40,
            justifyContent: 'center',
            // position:'absolute',
            // right:-5
          }}
          // onPress={() => chooseFile('photo')}
          // onPress={() => captureImage('photo')}>
          onPress={createThreeButtonAlert}>
          {/* // onPress={() => setVisible(true)}> */}

          <Entypo
            raised
            name="camera"
            size={18}
            color="grey"
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
        {/* </View> */}

        <Text
          style={{
            color: 'black',
            marginTop: 15,
            fontSize: 16,
            color: 'white',
            marginLeft: 150,
            top: 90,
          }}>
          Saufik
        </Text>
      </View>

      {/* <Image style={styles.avatar} source={require('../assets/splash.png')} /> */}

      <View style={{marginLeft: 10}}>
        <Text style={{fontWeight: 'normal', color: 'black'}}>
          Basic Information
        </Text>
      </View>

      <View
        style={{
          backgroundColor: 'white',
          padding: 1,
          borderRadius: 5,
          width: 320,
          height: 210,
          marginLeft: 15,
        }}>
        <View>
          <View
            style={{
              marginLeft: 10,
              borderWidth: 1,
              borderRadius: 40 / 2,
              height: 40,
              marginTop: 10,
              width: 300,
              borderColor: '#d3d3d3',
            }}>
            <Text
              style={{
                color: '#d3d3d3',
                backgroundColor: 'white',
                fontSize: 12,
                width: 60,
                position: 'absolute',
                top: -8,
                left: 25,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Full Name
            </Text>
            <TextInput
              // placeholder="Full Name"
              placeholderTextColor="black"
              color="black"
              style={styles.textInput}
            />
          </View>
        </View>

        <View>
          <View
            style={{
              marginLeft: 10,
              borderWidth: 1,
              borderRadius: 40 / 2,
              height: 40,
              marginTop: 10,
              width: 300,
              borderColor: '#d3d3d3',
            }}>
            <Text
              style={{
                color: '#d3d3d3',
                backgroundColor: 'white',
                fontSize: 12,
                width: 85,
                position: 'absolute',
                top: -8,
                left: 25,
                textAlign: 'center',
                // fontWeight:'bold',
              }}>
              Phone Number
            </Text>
            <TextInput
              keyboardType="numeric"
              // placeholder="Phone Number"
              color="black"
              placeholderTextColor="black"
              style={{borderColor: 'red'}}
            />
          </View>
        </View>

        <Text style={{color: '#d3d3d3', top: 15, marginLeft: 10, fontSize: 12}}>
          Date Of Birth
        </Text>

        <DatePicker
          style={styles.datePickerStyle}
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="MM-DD-YYYY"
          placeholderTextColor="black"
          backgroundColor="white"
          textColor="black"
          width={300}
          height={50}
          top={15}
          minDate="01-01-2016"
          maxDate="01-01-2019"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={date => {
            setDate(date);
          }}
        />
      </View>
      <Text style={{fontWeight: 'bold', color: 'black', marginLeft: 10}}>
        Driving License
      </Text>
      <View
        style={{
          backgroundColor: 'white',
          padding: 1,
          borderRadius: 5,
          width: 320,
          height: 150,
          marginLeft: 15,
        }}>
        <TouchableOpacity
          style={{top: 50, marginLeft: 20}}
          onPress={selectOneFile}>
          <AntDesign name="plussquareo" size={55} color="#d3d3d3" />
        </TouchableOpacity>
        <Text
          style={{
            color: 'black',
            top: 25,
            marginLeft: 50,
            width: 200,
            fontSize: 16,
            marginLeft: 85,
            top: -3,
          }}>
          Attach File From Phone
        </Text>
        <Text style={styles.textStyle}>{singleFile[0]?.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#dc143c',
    height: 180,
    // backgroundColor:'#fff'
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 80,
    borderWidth: 4,
    // borderColor: '#d3d3d3',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 5,
  },

  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  button: {
    flexDirection: 'row',
    height: 50,
    // backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    // elevation: 3,
  },

  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  input: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    width: '100%',
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  textStyle: {
    // backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 3,
    marginLeft: 90,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
});

export default Profile;
