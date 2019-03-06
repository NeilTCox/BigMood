// THIS COMPONENT SHOULD NOT BE USED IN PRODUCTION
// USE AS REFERENCE TO GET THE answers OBJECT FROM Survey.js

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const GREEN = 'rgba(141,196,63,1)';
const PURPLE = 'rgba(108,48,237,1)';
const defaultAnswers = { averageDaily: 'NEUTRAL', events: '.', userGoals: '.' };

export default class SurveyCompletedScreen extends Component {
    static navigationOptions = () => {
        return {
            headerStyle: {
                backgroundColor: GREEN,
                height: 40,
                elevation: 5,
            },
            headerTintColor: '#fff',
            headerTitle: 'Survey Results',
            headerTitleStyle: {
                flex: 1,
            }
        };
    }

    render() {
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const answers = this.props.navigation.getParam('surveyAnswers', defaultAnswers);

        return (
            <View style={styles.background}>
                <View style={styles.container}>
                    <Text style={styles.questionText}>[THIS PAGE SHOULDN'T LOAD; THE MAIN TAB VIEW SHOULD GO UP INSTEAD]</Text>
                    <Text style={styles.questionText}>Your average daily mood:</Text>
                    <Text>{answers.averageDaily}</Text>
                    <Text style={styles.questionText}>Your favorite activities:</Text>
                    <Text>{answers.events}</Text>
                    <Text style={styles.questionText}>Your goal for using this app:</Text>
                    <Text>{answers.userGoals}</Text>
                    <Text style={styles.questionText}>Raw JSON: [send this to the backend]</Text>
                    <Text>{JSON.stringify(this.props.navigation.getParam('surveyAnswers', {}))}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PURPLE,
    },
    container: {
        minWidth: '70%',
        maxWidth: '90%',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: 10,
    },
    questionText: {
        marginBottom: 20,
        fontSize: 20
    },
});
