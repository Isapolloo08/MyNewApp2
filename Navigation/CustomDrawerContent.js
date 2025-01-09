import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Material from 'react-native-vector-icons/MaterialIcons';
import Matcommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Awsome from 'react-native-vector-icons/FontAwesome';
import Awsome6 from 'react-native-vector-icons/FontAwesome6';
import Icon1 from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { UserRoleContext } from '../context/UserRoleContext';


const CustomDrawerContent = (props) => {
  const { userRole } = useContext(UserRoleContext);
  const { username } = useContext(UserRoleContext);
  const [expandedItems, setExpandedItems] = useState([]);
  const [nestedExpandedItems, setNestedExpandedItems] = useState([]);
  const navigation = useNavigation();

  const toggleSubMenu = (item) => {
    setExpandedItems((prevItems) =>
      prevItems.includes(item) ? prevItems.filter((prevItem) => prevItem !== item) : [...prevItems, item]
    );
  };

  const toggleNestedSubMenu = (item) => {
    setNestedExpandedItems((prevItems) =>
      prevItems.includes(item) ? prevItems.filter((i) => i !== item) : [...prevItems, item]
    );
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Splash' }],
    });
  };
  const disableForRoles = (roles) => !roles.includes(userRole);
  const enableForRoles = (roles) => roles.includes(userRole);

  return (
    <View style={{ flex: 1, backgroundColor: '#710808' }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#710808' }}>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#ffffff' }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../assets/profile.png')} style={{ height: 110, width: 110, resizeMode: 'cover' }} />
            <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 30 }}>
              <Text style={{ color: 'white', fontSize: 30, fontFamily: 'Roboto', fontWeight: 'bold' }}>{username}</Text>
              <Text style={{ color: 'white', fontSize: 18 }}>09632991145</Text>
            </View>
          </View>
        </View>
        <View style={{ paddingTop: 10 }} />
        <View style={styles.drawerContent}>
          <TouchableOpacity
            onPress={() => toggleSubMenu('ResidentInfo')}
            style={[styles.drawerItem, !enableForRoles(['resident', 'treasurer', 'kagawad', 'secretary', 'kapitan']) && styles.disabledItem]}
            disabled={!enableForRoles(['resident', 'treasurer', 'kagawad', 'secretary', 'kapitan'])}
          >
            <Icon1 name={'torsos-all-female'} size={24} color="white" />
            <Text style={styles.drawerItemText}>Resident Information{'\n'}and Census Management</Text>
            <Icon name={expandedItems.includes('ResidentInfo') ? 'up' : 'down'} size={24} color="white" />
          </TouchableOpacity>
          {expandedItems.includes('ResidentInfo') && (
            <View style={styles.subMenu}>
              <TouchableOpacity
                onPress={() => navigation.navigate('RequestDocument')}
                style={[styles.drawerSubItem, enableForRoles(['resident']) ? null : styles.disabledItem]}
                disabled={!enableForRoles(['resident', 'treasurer'])}
              >
                <Text style={[styles.drawerSubItemText, !enableForRoles(['resident', 'treasurer']) && styles.disabledItemText]}>
                  Request Document
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ResidentRegistrationandProfiling')}
                style={[styles.drawerSubItem, enableForRoles([ 'kagawad', 'secretary', 'kapitan']) ? null : styles.disabledItem]}
                disabled={!enableForRoles([ 'kagawad', 'secretary', 'kapitan'])}
              >
                <Text style={[styles.drawerSubItemText, !enableForRoles(['resident']) && styles.disabledItemText]}>
                  Resident Registration and Profiling
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('CensusData')}
                style={[styles.drawerSubItem, enableForRoles(['kagawad', 'secretary', 'kapitan']) ? null : styles.disabledItem]}
                disabled={!enableForRoles(['kagawad', 'secretary', 'kapitan'])}
              >
                <Text style={[styles.drawerSubItemText, !enableForRoles(['resident']) && styles.disabledItemText]}>
                  Census Data
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ResidentDocumentRequest')}
                style={[styles.drawerSubItem, enableForRoles(['treasurer']) ? null : styles.disabledItem]}
                disabled={!enableForRoles(['treasurer'])}
              >
                <Text style={[styles.drawerSubItemText, !enableForRoles(['resident']) && styles.disabledItemText]}>
                  Resident Documents Request
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ResidentRecords')}
                style={[styles.drawerSubItem, enableForRoles(['secretary', 'kapitan']) ? null : styles.disabledItem]}
                disabled={!enableForRoles(['secretary', 'kapitan'])}
              >
                <Text style={[styles.drawerSubItemText, !enableForRoles(['resident']) && styles.disabledItemText]}>
                  Resident Records
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ResidentAccountRequest')}
                style={[styles.drawerSubItem, enableForRoles(['secretary', 'kapitan']) ? null : styles.disabledItem]}
                disabled={!enableForRoles(['secretary', 'kapitan'])}
              >
                <Text style={[styles.drawerSubItemText, !enableForRoles(['resident']) && styles.disabledItemText]}>
                  Resident Account Request
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Reports')}
                style={[styles.drawerSubItem, enableForRoles(['secretary', 'kapitan']) ? null : styles.disabledItem]}
                disabled={!enableForRoles(['secretary', 'kapitan'])}
              >
                <Text style={[styles.drawerSubItemText, !enableForRoles(['resident']) && styles.disabledItemText]}>
                  Reports
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ServiceRecord')}
                style={[styles.drawerSubItem, enableForRoles([]) ? null : styles.disabledItem]}
                disabled={!enableForRoles([])}
              >
                <Text style={[styles.drawerSubItemText, !enableForRoles(['resident']) && styles.disabledItemText]}>
                  Service Record
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            onPress={() => toggleSubMenu('Financial Management')}
            style={[styles.drawerItem, disableForRoles(['resident', 'kagawad', 'treasurer', 'secretary', 'kapitan']) && styles.disabledItem]}
            disabled={disableForRoles(['resident', 'kagawad', 'treasurer', 'secretary', 'kapitan'])}
          >
            <Awsome name={'bank'} size={16} color="white" />
            <Text style={styles.drawerItemText}>Financial Management{'\n'}and Accounting System</Text>
            <Icon name={expandedItems.includes('Financial Management') ? 'up' : 'down'} size={24} color="white" />
          </TouchableOpacity>
          {expandedItems.includes('Financial Management') && (
            <View style={styles.subMenu}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('BudgetPlanningandMonitoring')}
                style={[styles.drawerSubItem, disableForRoles(['kagawad', 'treasurer', 'kapitan']) && styles.disabledItem]}
                disabled={disableForRoles(['kagawad', 'treasurer', 'kapitan'])}
              >
                <Text style={styles.drawerSubItemText}>Budget Planning and Monitoring</Text>
              </TouchableOpacity>
              <TouchableOpacity
                 onPress={() => props.navigation.navigate('RevenueandExpenseTracking')}
                style={[styles.drawerSubItem, disableForRoles(['kagawad', 'treasurer', 'secretary', 'kapitan']) && styles.disabledItem]}
                disabled={disableForRoles(['kagawad', 'treasurer', 'secretary' , 'kapitan' ])}
              >
                <Text style={styles.drawerSubItemText}>Revenue and Expense Tracking</Text>
              </TouchableOpacity>
            
              <TouchableOpacity
                 onPress={() => props.navigation.navigate('PayrollManagement')}
                style={[styles.drawerSubItem, disableForRoles(['treasurer', 'kapitan']) && styles.disabledItem]}
                disabled={disableForRoles(['treasurer', 'kapitan'])}
              >
                <Text style={styles.drawerSubItemText}>Payroll Management</Text>

              </TouchableOpacity>
             <TouchableOpacity 
            onPress={() => props.navigation.navigate('FinancialManagement')} 
            style={[styles.drawerSubItem, disableForRoles(['kagawad', 'treasurer', 'kapitan']) && styles.disabledItem]}
                disabled={disableForRoles(['kagawad', 'treasurer', 'kapitan'])}
            
            >
              <Text style={styles.drawerSubItemText}>Financial Management</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => props.navigation.navigate('AuditsManagement')} 
            style={[styles.drawerSubItem, disableForRoles(['kagawad', 'treasurer', 'secretary', 'kapitan']) && styles.disabledItem]}
                disabled={disableForRoles(['kagawad', 'treasurer', 'secretary', 'kapitan'])}
            >
              <Text style={styles.drawerSubItemText}>Audit Management</Text>
            </TouchableOpacity>
          </View>
        )}

          <TouchableOpacity
            onPress={() => toggleSubMenu('Incident Report')}
            style={[styles.drawerItem, disableForRoles(['resident', 'kagawad', 'secretary', 'kapitan']) && styles.disabledItem]}
                disabled={disableForRoles(['resident', 'kagawad', 'secretary', 'kapitan'])}
          >
            <Awsome6 name={'file-lines'} size={24} color="white" />
            <Text style={styles.drawerItemText}>Incident Report Case{'\n'}Management</Text>
            <Icon name={expandedItems.includes('Incident Report') ? 'up' : 'down'} size={24} color="white" />
          </TouchableOpacity>
          {expandedItems.includes('Incident Report') && (
            <View style={styles.subMenu}>
              <TouchableOpacity 
              onPress={() => props.navigation.navigate('BlotterForm')} 
              style={[styles.drawerSubItem, disableForRoles(['resident', 'kagawad', 'secretary', 'kapitan']) && styles.disabledItem]}
                disabled={disableForRoles(['resident', 'kagawad', 'secretary', 'kapitan'])}>
                <Icon name={'form'} size={24} color="white" />
                <Text style={styles.drawerSubItemText}>Blotter Form</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={() => props.navigation.navigate('BlotterList')} 
              style={[styles.drawerSubItem, disableForRoles([ 'kagawad', 'secretary', 'kapitan']) && styles.disabledItem]}
                disabled={disableForRoles([ 'kagawad', 'secretary', 'kapitan'])}>
              <Awsome6 name={'table-list'} size={24} color="white" />
                <Text style={styles.drawerSubItemText}>Blotter List</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={() => props.navigation.navigate('CaseReport')} 
              style={[styles.drawerSubItem, disableForRoles(['resident', 'kagawad', 'secretary', 'kapitan']) && styles.disabledItem]}
                disabled={disableForRoles(['resident', 'kagawad', 'secretary', 'kapitan'])}>
              <Matcommunity name={'briefcase-edit-outline'} size={24} color={'white'}/>
                <Text style={styles.drawerSubItemText}>Case Report</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={() => props.navigation.navigate('SummonSchedule')} 
              style={[styles.drawerSubItem, disableForRoles(['secretary', 'kapitan']) && styles.disabledItem]}
                disabled={disableForRoles(['secretary', 'kapitan'])}>
                <Material name={'schedule'} size={24} color={'white'} /> 
                <Text style={styles.drawerSubItemText}>Summon Schedule/{'\n'}Calendar</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            onPress={() => toggleSubMenu('Community Development')}
            style={[styles.drawerItem, disableForRoles(['resident', 'kagawad', 'secretary', 'kapitan']) && styles.disabledItem]}
                disabled={disableForRoles(['resident', 'kagawad', 'secretary', 'kapitan'])}
          >
             <Material name={'miscellaneous-services'} size={24} color="white" />
            <Text style={styles.drawerItemText}>Community Development{'\n'}and Services Management</Text>
            <Icon name={expandedItems.includes('Community Development') ? 'up' : 'down'} size={24} color="white" />
          </TouchableOpacity>
          {expandedItems.includes('Community Development') && (
            <View style={styles.subMenu}>
              <TouchableOpacity 
              onPress={() => props.navigation.navigate('Dashboard')} 
              style={[styles.drawerSubItem, disableForRoles(['kapitan']) && styles.disabledItem]}
                disabled={disableForRoles(['kapitan'])}>
                <Text style={styles.drawerSubItemText}>Dashboard</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => toggleNestedSubMenu('Program Planning and Scheduling')} 
                style={[styles.drawerSubItem, disableForRoles(['kagawad', 'secretary', 'kapitan']) && styles.disabledItem]}
                disabled={disableForRoles(['kagawad', 'secretary', 'kapitan'])}
                >
                <Text style={styles.drawerSubItemText}>Program Planning and Scheduling</Text>
                <Icon name={nestedExpandedItems.includes('Program Planning and Scheduling') ? 'up' : 'down'} size={24} color="white" />
              </TouchableOpacity>
              {nestedExpandedItems.includes('Program Planning and Scheduling') && (
              <View style={styles.subSubMenu}>
                <TouchableOpacity 
                onPress={() => props.navigation.navigate('Calendar')} 
                style={[styles.drawerSubItem, disableForRoles(['kagawad', 'secretary', 'kapitan']) && styles.disabledItem]}
                disabled={disableForRoles(['kagawad', 'secretary', 'kapitan'])}>
                  <Text style={styles.drawernestedSubItemText}>Calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => props.navigation.navigate('Proposed Program')} 
                style={[styles.drawerSubItem, disableForRoles(['kapitan']) && styles.disabledItem]}
                disabled={disableForRoles(['kapitan'])}>
                  <Text style={styles.drawernestedSubItemText}>Proposed Program</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => props.navigation.navigate('Program Schedule')} 
                style={[styles.drawerSubItem, disableForRoles(['kagawad']) && styles.disabledItem]}
                disabled={disableForRoles(['kagawad'])}>
                  <Text style={styles.drawernestedSubItemText}>Program Schedule</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => props.navigation.navigate('Approved Program')} 
                style={[styles.drawerSubItem, disableForRoles(['kagawad', 'secretary', 'kapitan']) && styles.disabledItem]}
                disabled={disableForRoles(['kagawad', 'secretary', 'kapitan'])}>
                  <Text style={styles.drawernestedSubItemText}>Pending Programs</Text>
                </TouchableOpacity>
              </View>
            )}
              <TouchableOpacity 
              onPress={() => props.navigation.navigate('Events')} 
              style={[styles.drawerSubItem, disableForRoles(['resident', 'kagawad', 'secretary', 'kapitan']) && styles.disabledItem]}
                disabled={disableForRoles(['resident', 'kagawad', 'secretary', 'kapitan'])}>
                <Text style={styles.drawerSubItemText}>Events</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={() => props.navigation.navigate('ResourceManagement')} 
              style={[styles.drawerSubItem, disableForRoles(['kagawad', 'secretary', 'kapitan']) && styles.disabledItem]}
                disabled={disableForRoles(['kagawad', 'secretary', 'kapitan'])}>
                <Text style={styles.drawerSubItemText}>Resource Management</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={() => props.navigation.navigate('BeneficiaryManagement')} 
              style={[styles.drawerSubItem, disableForRoles(['kagawad', 'secretary', 'kapitan']) && styles.disabledItem]}
                disabled={disableForRoles(['kagawad', 'secretary', 'kapitan'])}>
                <Text style={styles.drawerSubItemText}>Beneficiary Management</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={() => props.navigation.navigate('Notification')} 
              style={[styles.drawerSubItem, disableForRoles(['resident']) && styles.disabledItem]}
                disabled={disableForRoles(['resident'])}>
                <Text style={styles.drawerSubItemText}>Notification</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            onPress={() => toggleSubMenu('Administrator')}
            style={styles.drawerItem}
          >
             <Awsome name={'user-circle'} size={24} color="white" />
            <Text style={styles.drawerItemText}>Administrator</Text>
            <Icon name={expandedItems.includes('Administrator') ? 'up' : 'down'} size={24} color="white" />
          </TouchableOpacity> 
          {expandedItems.includes('Administrator') && (
            <View style={styles.subMenu}>
              <TouchableOpacity onPress={() => props.navigation.navigate('SubScreen3')} style={styles.drawerSubItem}>
                <Text style={styles.drawerSubItemText}>Iniisip pa</Text>
              </TouchableOpacity>
            </View>
          )}
           <TouchableOpacity
            onPress={() => toggleSubMenu('History')}
            style={styles.drawerItem}
          >
            <Material name={'history'} size={24} color="white" />
            <Text style={styles.drawerItemText}>History</Text>
            <Icon name={expandedItems.includes('History') ? 'up' : 'down'} size={24} color="white" />
          </TouchableOpacity> 
          {expandedItems.includes('History') && (
            <View style={styles.subMenu}>
              <TouchableOpacity onPress={() => props.navigation.navigate('SubScreen3')} style={styles.drawerSubItem}>
                <Text style={styles.drawerSubItemText}>Iniisip palang</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </DrawerContentScrollView>
      <View style={{ borderTopWidth: 1, borderTopColor: '#fff', padding: 15 }}>
        <TouchableOpacity onPress={handleLogout} style={{ marginLeft: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='log-out-outline' size={22} style={{ color: '#fff' }} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto',
                marginLeft: 10,
                color: '#fff'
              }}>
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#710808',
  },
  drawerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  drawerItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginEnd:'auto',
    paddingLeft: 10,
  },
  drawerSubItem: {
    marginLeft: 20,
    marginVertical: 5,
    flexDirection: 'row',
  },

  disabledItem: {
    opacity: 0.5,
  },

  drawerSubItemText: {
    fontSize: 16,
    color: 'white',
    justifyContent: 'flex-end',
    fontWeight:'bold',
    marginEnd:'auto',
  },
  subMenu: {
    paddingLeft: 20,
    marginStart:'auto',
  },
  subSubMenu: {
    marginEnd: 'auto',
    marginLeft:'auto',
  },

  drawernestedSubItemText: {
    fontSize: 14,
    fontWeight: "bold",
    color: 'gray',
  }
});

export default CustomDrawerContent;