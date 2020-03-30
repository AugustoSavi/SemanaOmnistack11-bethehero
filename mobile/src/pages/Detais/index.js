import React from 'react';
import {Feather} from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import { View,Image,Text,TouchableOpacity ,Linking} from 'react-native';
import styles from './styles';
import { useNavigation, useRoute} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

export default function Detail(){
    
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;
    const message =`Olá ${incident.name},estou entrando em contato pois gostaria de ajudar no caso ${incident.title} com o valor de ${Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}`;

    function navigateToIncidents() {
        navigation.goBack();
    }
    function sendMail(){
        MailComposer.composeAsync({
            subject:`Heroi do caso:${incident.title}`,
            recipients:[incident.email],
            body: message,
        })
    }
    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }
    
    return(
        <View style ={styles.container}>
            <View style={styles.header}>
                <Image source = {logoImg}/>

            <TouchableOpacity onPress={navigateToIncidents}>
            
                <Feather name='arrow-left' size ={28} color="#E02041"/>

            </TouchableOpacity>      
            </View>

            <View style={styles.Incidents}>

                <Text style={[styles.IncidentsProperty,{marginTop:0}]}>ONG:</Text>
    <Text style={styles.IncidentsValue}>{incident.name} de {incident.cidade}/{incident.uf}</Text>
                
                <Text style={styles.IncidentsProperty}>Caso:</Text>
                <Text style={styles.IncidentsValue}>{incident.description}</Text>
                
                <Text style={styles.IncidentsProperty}>Valor:</Text>
                <Text style={styles.IncidentsValue}>{Intl.NumberFormat('pt-BR',{
                    style:'currency',
                    currency:'BRL'}).format(incident.value)}</Text>
                
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.herosTitle}> Salve o dia!</Text>
                <Text style={styles.herosTitle}> Seja o Herói desse casso.</Text>
                <Text style={styles.herosDescription}>Entre em Contato:</Text>

                <View style ={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
  
}
