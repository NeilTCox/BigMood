// use parts of this in DailyLog

import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, StyleSheet} from 'react-native';

export default class ModalDemo extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(desiredVisibility) {
    this.setState({modalVisible: desiredVisibility});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.modalBackground}>
            <View style={styles.window}>
              <Text>Hello World!</Text>

              <View style={styles.modalButtonContainer}>
                <TouchableHighlight style={styles.smallButton}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text style={styles.smallButtonText}>Cancel</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.smallButton}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text style={styles.smallButtonText}>Create</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableHighlight style={styles.button}
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={styles.buttonText}>New Event</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: 'rgba(200,200,200,0.5)', // grayish with half opacity
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  window: {
    backgroundColor: 'white',
    width: 330,
    height: 500,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginTop: 20,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'grey'
  },
  modalButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallButton: {
    marginTop: 20,
    marginRight: 20,
    width: 120,
    height: 60,
    alignItems: 'center',
    backgroundColor: 'grey'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  },
  smallButtonText: {
    padding: 20,
    color: 'white'
  }
});
