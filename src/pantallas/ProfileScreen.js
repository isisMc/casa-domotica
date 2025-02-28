/*import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pantalla de Perfil</Text>
      
    </View>
  );
}
import { StatusBar } from 'expo-status-bar';*/
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Modal, Button, ScrollView } from 'react-native';

export default function ProfileScreen({ navigation })  {
  const grifo = require("../../assets/iconos/grifo.png");
  const cien = require("../../assets/imgs/100.jpg");
  const noventa = require("../../assets/imgs/90.jpg");
  const ochenta = require("../../assets/imgs/80.jpg");
  const setenta = require("../../assets/imgs/70.jpg");
  const sesenta = require("../../assets/imgs/60.jpg");
  const cincuenta = require("../../assets/imgs/50.jpg");
  const cuarenta = require("../../assets/imgs/40.jpg");
  const treinta = require("../../assets/imgs/30.jpg");
  const veinte = require("../../assets/imgs/20.jpg");
  const diez = require("../../assets/imgs/10.jpg");
  const cero = require("../../assets/imgs/0.jpg");
  const image1 = require("../../assets/imgs/plantasOff.jpg");
  const image2 = require("../../assets/imgs/plantasOn.jpg");
  const image3 = require("../../assets/imgs/regaderaOff.jpg");
  const image4 = require("../../assets/imgs/regaderaOn.jpg");
  const image5 = require("../../assets/imgs/inodoroOff.jpg");
  const image6 = require("../../assets/imgs/inodoroOn.jpg");
  const image7 = require("../../assets/imgs/carwashOff.jpg");
  const image8 = require("../../assets/imgs/carwashOn.jpg");
  const image9 = require("../../assets/imgs/lavamanosOff.jpg");
  const image10 = require("../../assets/imgs/lavamanosOn.jpg");

  const [images, setImages] = useState({
    img1: image1,
    img2: image3,
    img3: image5,
    img4: image7,
    img5: image9,
  });

  const [isButtonEnabled, setIsButtonEnabled] = useState({
    img1: true,
    img2: true,
    img3: true,
    img4: true,
    img5: true,
  });
 const [modalVisible, setModalVisible] = useState(false);
  const [porcentaje, setPorcentaje] = useState(100);

  const hundeClick = (id, imgA, imgB, autoOff = false) => {
    if (!isButtonEnabled[id]) return;

    setImages((prevImages) => ({
      ...prevImages,
      [id]: prevImages[id] === imgA ? imgB : imgA,
    }));

    if (images[id] === imgA) {
      setPorcentaje((prev) => Math.max(prev - 10, 0));
    }

    if (autoOff) {
      setIsButtonEnabled((prev) => ({
        ...prev,
        [id]: false,
      }));

      setTimeout(() => {
        setImages((prevImages) => ({
          ...prevImages,
          [id]: imgA,
        }));
        setIsButtonEnabled((prev) => ({
          ...prev,
          [id]: true,
        }));
      }, 3000);
    }
  };

  const getTankImage = () => {
    switch(porcentaje){
      case 0:
       return cero;
       case 10:
         return diez;
       case 20:
         return veinte;
       case 30:
         return treinta;
       case 40:
         return cuarenta;
       case 50:
         return cincuenta;
       case 60:
         return sesenta;
       case 70:
         return setenta;
       case 80:
         return ochenta;
       case 90:
         return noventa;
       case 100:
         return cien;
  };
};

  const renderImage = (id, imgA, imgB, autoOff = false) => (
    <View style={styles.imageContainer}>
      <TouchableOpacity
        onPress={() => hundeClick(id, imgA, imgB, autoOff)}
        disabled={!isButtonEnabled[id] || porcentaje === 0}
      >
        <Image source={images[id]} style={styles.image} />
      </TouchableOpacity>
      <Text style={[styles.label, { color: images[id] === imgA ? 'red' : 'green' }]}>
        {images[id] === imgA ? 'Off' : 'On'}
      </Text>
    </View>
  );

  useEffect(() => {
    if (porcentaje === 0) {
      setImages({
        img1: image1,
        img2: image3,
        img3: image5,
        img4: image7,
        img5: image9,
      });

      setIsButtonEnabled({
        img1: false,
        img2: false,
        img3: false,
        img4: false,
        img5: false,
      });
    } else if (porcentaje === 100) {
      setIsButtonEnabled({
        img1: true,
        img2: true,
        img3: true,
        img4: true,
        img5: true,
      });
    }
  }, [porcentaje]);

  const llenar = () => {
    if (porcentaje !== 100) {
      setPorcentaje(100);
    } else {
      setModalVisible(true);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>¡El tanque ya esta lleno!</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.tankContainer}>
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText} onPress={llenar}>Llenar</Text>
        </TouchableOpacity>
        <Image source={getTankImage()} style={styles.image} />
        <Text style={styles.title}>Tanque: {porcentaje}%</Text>
      </View>
      <View style={styles.gridContainer}>
        {renderImage("img1", image1, image2)}
        {renderImage("img2", image3, image4)}
        {renderImage("img3", image5, image6, true)}
        {renderImage("img4", image7, image8)}
        {renderImage("img5", image9, image10)}
      </View>
      <Text style={styles.text}>Carranza Moreno Cinthia Guadalupe</Text>
      <Text style={styles.text}>Centeno Madrid Isis Nayeli</Text>
    </View>
     </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F161C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  tankContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  label: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#ffff',
  },
  text: {
    color: '#ffff',
  },
  button: {
    backgroundColor: '#ffff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  buttonText: {
    color: '#0a0a0a',
    fontSize: 16,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: '#0a0a0a',
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
