// App.js
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Modal from 'react-native-modal';
import { StyleSheet, TouchableOpacity, Text} from 'react-native';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FMAS1 from '../FMAS/audit';
import FMAS5 from '../FMAS/budgets';
import FMAS2 from '../FMAS/financial';
import FMAS3 from '../FMAS/payroll';
import FMAS4 from '../FMAS/transact';
import AuditAdd from '../FMAS/auditadd'
import Programs from '../FMAS/programs';
import AddBudget from '../FMAS/budgetadd';
import ProgramDetail from '../FMAS/programdetail';
import TransactAdd from '../FMAS/transactadd';
import AddPayroll from '../FMAS/payrolladd';
import AddFinancial from '../FMAS/financialadd';
import IRCM2 from '../Incident Report and CM/Blotter';
import IRCM1 from '../Incident Report and CM/BlotterList';
// import IRCM3 from './Incident Report and CM/CaseReport';
// import IRCM4 from './Incident Report and CM/SummonSchedule';
import CDSM1 from '../CDSM/Dashboard';
import CDSM2 from '../CDSM/ProgramPlanningandScheduling';
import CDSM3 from '../CDSM/Resident/Notifications';
import CDSM4 from '../CDSM/ResourceManagement';
import CDSM5 from '../CDSM/SecretaryBeneficiaryManagement/BeneficiaryRequests';
import CDSM6 from '../CDSM/Notification';
import CDSMSUB1 from '../CDSM/PPS_Calendera';
import CDSMSUB2 from '../CDSM/PPS_ProposedProgram';
import CDSMSUB3 from '../CDSM/PPS_ProgramSchedule';
import CDSMSUB4 from '../CDSM/PPS_ApprovedProgram'
import Applicants from '../CDSM/secretary/Applicants';
import { UserRoleProvider } from '../context/UserRoleContext'; 
import BeneficiaryRequests from '../CDSM/SecretaryBeneficiaryManagement/BeneficiaryRequests';
import BM from '../CDSM/secretary/SBeneficiary';
import DetailedView from '../CDSM/SecretaryBeneficiaryManagement/DetailedView';
// import AddResidentRegister from '../Resident Information and CM/RICM inside screen/AddResidentRegister';
// import ConfirmationScreen from '../Resident Information and CM/RICM inside screen/ConfirmationScreen';
// import ResidentRegistrationandProfiling from '../Resident Information and CM/ResidentRegistrationandProfiling';
// import HeaderRegister from '../Resident Information and CM/RICM inside screen/HeaderRegister';
// import ListOfRequestDocx from '../Resident Information and CM/RICM inside screen/ListOfRequestDocx';
// import ResidentDetails from '../Resident Information and CM/RICM inside screen/ResidentDetails';
// import RegisterScreen from '../Screen/RegisterScreen';
// import Reports from '../Resident Information and CM/RICM inside screen/Reports';
// import ViewReportScreen from '../Resident Information and CM/RICM inside screen/ViewReportScreen'; 
// import listprogram from '../FMAS/programlist';
// import Addprogram from '../FMAS/programadd';
import SplashScreens from '../Screen/SplashScreen'
import LoginScreen from '../Screen/LogInScreen'
import CustomHeader from '../Navigation/CustomHeader';
import Header_subscreen from '../Navigation/Header_subscreen';
import CustomDrawerContent from '../Navigation/CustomDrawerContent';
import HomeScreen from '../Screen/HomeScreen';
// import RequestDocument from '../Resident Information and CM/RequestDocument';
import CustomHeaderTitle from '../Navigation/CustomHeader_RET';
import CustomHeader_BPM from '../Navigation/CustomerHeader_BGP';
// import ResidentDocumentRequest from '../Resident Information and CM/ResidentDocumentRequest';
// import SubScreen4 from '../Resident Information and CM/CensusData';
// import ResidentRecords from '../Resident Information and CM/ResidentRecords';
// import ResidentAccountRequest from './Resident Information and CM/ResidentAccountRequest';
// import AddCensusData from '../Resident Information and CM/RICM inside screen/AddCensusData';
// import CensusDetails from '../Resident Information and CM/RICM inside screen/CensusDetails';
// import CensusHistory from '../Resident Information and CM/RICM inside screen/CensusHistory';
// import CreateAccount from '../Resident Information and CM/RICM inside screen/CreateAccount';
// import EditCensusData from '../Resident Information and CM/RICM inside screen/EditCensusData';
// import EditReportScreen from '../Resident Information and CM/RICM inside screen/EditReportScreen';
// import EditResident from '../Resident Information and CM/RICM inside screen/EditResident';
// import PrintReceiptTreasurer from './Resident Information and CM/RICM inside screen/PrintReceiptTreasurer';
// import { ReportProvider } from './Resident Information and CM/RICM inside screen/ReportContext';
// import ResidentHistory from './Resident Information and CM/RICM inside screen/ResidentHistory';
// import ViewDocumentRequestDetails from './Resident Information and CM/RICM inside screen/ViewDocumentRequestDetails';
// import ViewRecordScreen from './Resident Information and CM/RICM inside screen/ViewRecordScreen';
import CCalendar from '../CDSM/Kapitan/CCalendar'; // Ensure the path is correct
import CProposedProgram from '../CDSM/Kapitan/CProposedProgram'; // Ensure the path is correct
import Dashboard from '../CDSM/Kapitan/Dashboard'; // Ensure the path is correct
import CPending from '../CDSM/Kapitan/CPending';
import CYearDetails from '../CDSM/Kapitan/CYearDetails';
import CExpenses from '../CDSM/Kapitan/CExpenses';
import SCalendar from '../CDSM/secretary/SCalendar'; // Ensure the path is correct
import SApprovedProgram from '../CDSM/secretary/SApprovedProgram';
import CEvents from '../CDSM/secretary/SEvents';
import CResources from '../CDSM/secretary/CResources';
import CBeneficiary from '../CDSM/secretary/SBeneficiary';
import CFunds from '../CDSM/secretary/CFunds';
import CMaterials from '../CDSM/secretary/CMaterials';
import Agenda from '../CDSM/secretary/Agenda';
import ProgramSched from '../CDSM/kagawad/ProgramSchedule'
import Attendance from '../CDSM/secretary/Attendance';
import SOtherExpenses from '../CDSM/secretary/SOtherExpenses';
import SConfirmMeeting from '../CDSM/secretary/SOtherExpenses';
import PPS_ApprovedProgram from '../CDSM/PPS_ApprovedProgram';
import ProgramSchedule from '../CDSM/kagawad/ProgramSchedule';
import ProposeEvent from '../CDSM/kagawad/ProposeEvent';
import ProposeActivity from '../CDSM/kagawad/ProposeActivity';
import ProposeMeeting from '../CDSM/kagawad/ProposeMeeting';
import ActivityMaterial from '../CDSM/kagawad/ActivityMaterial';
import ActivityExpenses from '../CDSM/kagawad/ActivityExpenses';
import EventMaterial from '../CDSM/kagawad/EventMaterial';
import MeetingParticipants from '../CDSM/kagawad/MeetingParticipants';
import MeetingExpenses from '../CDSM/kagawad/MeetingExpenses';
import OtherExpenses from '../CDSM/kagawad/OtherExpenses';
import Confirmation from '../CDSM/kagawad/Confirmation';
import ConfirmActivity from '../CDSM/kagawad/ConfirmActivity';
import ConfirmMeeting from '../CDSM/kagawad/ConfirmMeeting';
import History from '../CDSM/kagawad/History';
import Pending from '../CDSM/kagawad/Pending';
import SeeDetails from '../CDSM/kagawad/SeeDetails';
import KProposedProgram from '../CDSM/kagawad/KProposedProgram';
import KEvents from '../CDSM/kagawad/KEvents';
// import KFunds from '../CDSM/kagawad/KFunds';
// import KExpenses from './CDSM/kagawad/KExpenses';
// import KMaterials from './CDSM/kagawad/KMaterials';
// import KResources from './CDSM/kagawad/KResources'; // Ensure the path is correct
// import YearDetails from './CDSM/kagawad/YearDetails'; // Ensure the path is correct 4
// import SecretaryScreen from '../Screen/SecretaryScreen';
import SeeMore from '../CDSM/secretary/SeeMore'; // Ensure the path is correct
import EventsResidents from '../CDSM/Resident/EventsResidents';
import EventOverview from '../CDSM/Resident/EventOverview';
import Notifications from '../CDSM/Resident/Notifications';
import NotificationDetails from '../CDSM/Resident/notificationDetails';
import SubmitRequirements from '../CDSM/Resident/SubmitRequirements'; // SubmitRequirements Screen
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerToggleButton = ({ navigation }) => {
    return (
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuButton}>
        <Ionicons name="menu" size={24} color="#fff" />
      </TouchableOpacity>
    );
  };



  
const ProgramAdd = () => (
    <Stack.Navigator>
    <Stack.Screen 
        name="Home_Home" 
        component={Addprogram} 
        options={({ navigation }) => ({
            header: () => <Header_subscreen navigation={navigation} />,
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Ionicons name="menu" size={30} color="#000" />
                </TouchableOpacity>
            ),
        })}
    />
</Stack.Navigator>
);


const Programlist = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Home_Home" 
            component={listprogram} 
            options={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#710808', // Set header background color to maroon
                },
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const ProgramSchedStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Home_Home" 
            component={ProgramSchedStack} 
            options={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#710808', // Set header background color to maroon
                },
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const ProgramStack = () => (
    <Stack.Navigator
      initialRouteName="ProgramSchedule"
      screenOptions={{
        headerStyle: { backgroundColor: '#710808' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="ProgramSchedule"
        component={ProgramSched}
        options={{ headerShown: false }}
      />
    <Stack.Screen
        name="KEvents"
        component={KEvents}
        options={({ navigation }) => ({
          title: 'Events',
          headerLeft: () => <DrawerToggleButton navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ProposeEvent"
        component={ProposeEvent}
        options={{ title: 'Propose Event' }}
      />
      <Stack.Screen
        name="ProposeMeeting"
        component={ProposeMeeting}
        options={{ title: 'Propose Meeting' }}
      />
      <Stack.Screen
        name="ProposeActivity"
        component={ProposeActivity}
        options={{ title: 'Propose Activity' }}
      />
      <Stack.Screen
        name="ActivityMaterial"
        component={ActivityMaterial}
        options={{ title: 'Activity Material' }}
      />
      <Stack.Screen
        name="ActivityExpenses"
        component={ActivityExpenses}
        options={{ title: 'Activity Expenses' }}
      />
      <Stack.Screen
        name="ConfirmActivity"
        component={ConfirmActivity}
        options={{ title: 'Confirm Activity' }}
      />
      <Stack.Screen
        name="EventMaterial"
        component={EventMaterial}
        options={{ title: 'Event Material' }}
      />
      <Stack.Screen
        name="OtherExpenses"
        component={OtherExpenses}
        options={{ title: 'Other Expenses' }}
      />
      <Stack.Screen
        name="Confirmation"
        component={Confirmation}
        options={{ title: 'Confirmation' }}
      />
      <Stack.Screen
        name="MeetingParticipants"
        component={MeetingParticipants}
        options={{ title: 'Meeting Participants' }}
      />
      <Stack.Screen
        name="MeetingExpenses"
        component={MeetingExpenses}
        options={{ title: 'Meeting Expenses' }}
      />
      <Stack.Screen
        name="ConfirmMeeting"
        component={ConfirmMeeting}
        options={{ title: 'Confirm Meeting' }}
      />
            <Stack.Screen
        name="History"
        component={History}
        options={{ title: 'History' }}
      />
      <Stack.Screen
        name="Pending"
        component={Pending}
        options={{ title: 'Pending' }}
      />
    </Stack.Navigator>
  );
  
  const ReportsStack = () => (
    <ReportProvider>
        <Stack.Navigator>
            <Stack.Screen 
                name="REPORTS" 
                component={Reports} 
                options={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: '#710808', // Set header background color to maroon
                    },
                    headerTintColor: '#fff', // Set header text color to white
                    headerTitleAlign: 'center', // Center the header title
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: -8,
                            }}
                            onPress={() => navigation.toggleDrawer()}
                        >
                            <Ionicons name="menu" size={40} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen 
                name="EditReportScreen" 
                component={EditReportScreen} 
                options={{
                    headerTitle: 'REPORTS',
                    headerStyle: {
                        backgroundColor: '#710808', // Red background color
                    },
                    headerTintColor: '#FFFFFF', // Text color in header
                    headerTitleStyle: {
                        fontWeight: 'bold', // Style for header title
                    },
                }}
            />
            <Stack.Screen 
                name="ViewReportScreen" 
                component={ViewReportScreen} 
                options={{
                    headerTitle: 'REPORTS',
                    headerStyle: {
                        backgroundColor: '#710808', // Red background color
                    },
                    headerTintColor: '#FFFFFF', // Text color in header
                    headerTitleStyle: {
                        fontWeight: 'bold', // Style for header title
                    },
                }}
            />
        </Stack.Navigator>
    </ReportProvider>
);


  
  const NotificationStack = () => (
    <Stack.Navigator
      initialRouteName="Notification"
      screenOptions={{
        headerStyle: { backgroundColor: '#710808' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={({ navigation }) => ({
            headerTitle: 'NOTIFICATION',
            headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#710808', // Red background color
                },
                headerTintColor: '#FFFFFF', // Text color in header
                headerTitleStyle: {
                    fontWeight: 'bold', // Style for header title
                
                },
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginStart: 'auto', }}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Ionicons name="menu" size={40} color="white" />
                </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="FinalNotif"
        component={FinalNotif}
        options={({ navigation }) => ({
            headerTitle: ' FINAL NOTIFICATION',
            headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#710808', // Red background color
                },
                headerTintColor: '#FFFFFF', // Text color in header
                headerTitleStyle: {
                    fontWeight: 'bold', // Style for header title
                
                },
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginStart: 'auto', }}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Ionicons name="menu" size={40} color="white" />
                </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="FirstNotif"
        component={FirstNotif}
        options={({ navigation }) => ({
            headerTitle: ' FIRST NOTIFICATION',
            headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#710808', // Red background color
                },
                headerTintColor: '#FFFFFF', // Text color in header
                headerTitleStyle: {
                    fontWeight: 'bold', // Style for header title
                
                },
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginStart: 'auto', }}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Ionicons name="menu" size={40} color="white" />
                </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="SecondNotif"
        component={SecondNotif}
        options={({ navigation }) => ({
            headerTitle: 'SECOND NOTIFICATION',
            headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#710808', // Red background color
                },
                headerTintColor: '#FFFFFF', // Text color in header
                headerTitleStyle: {
                    fontWeight: 'bold', // Style for header title
                
                },
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginStart: 'auto', }}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Ionicons name="menu" size={40} color="white" />
                </TouchableOpacity>
            ),
        })}
      />
    </Stack.Navigator>
  );

  const EventsStackNavigator = ({ navigation }) => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#7B0A0A' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="EventsList"
        component={EventsResidents}
        options={{
          title: 'Events',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons
                name="menu"
                size={28}
                color="#FFFFFF"
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="EventOverview"
        component={EventOverview}
        options={{ title: 'Event Overview' }}
      />
      <Stack.Screen
        name="SubmitRequirements"
        component={SubmitRequirements}
        options={{ title: 'Submit Requirements' }}
      />
    </Stack.Navigator>
  );
  
  
  // Stack Navigator for Notifications
  function NotificationsStackNavigator({ navigation }) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#7B0A0A' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="NotificationList"
          component={Notifications}
          options={{
            title: 'Notifications',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons
                  name="menu"
                  size={28}
                  color="#FFFFFF"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="NotificationDetails"
          component={NotificationDetails}
          options={{ title: 'Notification Details' }}
        />
      </Stack.Navigator>
    );
  }
  
  const BeneficiaryStack = () => (
    <Stack.Navigator
      initialRouteName="BeneficiaryManagement"
      screenOptions={{
        headerStyle: { backgroundColor: '#710808' },
        headerTintColor: '#fff',
      }}
      
    >
      <Stack.Screen
        name="BeneficiaryRequests"
        component={BeneficiaryRequests}
        options={({ navigation }) => ({
            headerTitle: 'BENEFICIARY REQUEST',
            headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#710808', // Red background color
                },
                headerTintColor: '#FFFFFF', // Text color in header
                headerTitleStyle: {
                    fontWeight: 'bold', // Style for header title
                
                },
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginStart: 'auto', }}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Ionicons name="menu" size={40} color="white" />
                </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
      name="DetailedView"
        component={DetailedView}
        options={({ navigation }) => ({
            headerTitle: 'BENEFICIARY REQUEST',
            headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#710808', // Red background color
                },
                headerTintColor: '#FFFFFF', // Text color in header
                headerTitleStyle: {
                    fontWeight: 'bold', // Style for header title
                
                },
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginStart: 'auto', }}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Ionicons name="menu" size={40} color="white" />
                </TouchableOpacity>
            ),
        })}
        
      />

    </Stack.Navigator>
  );

  const RegisterStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="RegisterScreen" 
            component={RegisterScreen} 
            options={{
                headerTitle: 'REGISTER ACCOUNT',
                headerStyle: {
                    backgroundColor: '#710808', // Red background color
                },
                headerTintColor: '#FFFFFF', // Text color in header
                headerTitleStyle: {
                    fontWeight: 'bold', // Style for header title
                },
            }}
        />
        <Stack.Screen 
            name="CreateAccount" 
            component={CreateAccount} 
            options={{
                headerTitle: 'REGISTER ACCOUNT',
                headerStyle: {
                    backgroundColor: '#710808', // Red background color
                },
                headerTintColor: '#FFFFFF', // Text color in header
                headerTitleStyle: {
                    fontWeight: 'bold', // Style for header title
                },
            }}
        />
    </Stack.Navigator>
);

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Home_Home" 
            component={HomeScreen} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const RequestDocumentStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="REQUEST DOCUMENT" 
            component={RequestDocument} 
            options={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#710808', // Set header background color to maroon
                },
                headerTintColor: '#fff', // Set header text color to white
                headerTitleAlign: 'center', // Center the header title
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: -8,
                         }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={40} color="white" />
                    </TouchableOpacity>
                ),
            })}
        />
        <Stack.Screen 
            name="ConfirmationScreen" 
            component={ConfirmationScreen} 
            options={{
                headerTitle: 'REQUEST DETAILS',
                headerStyle: {
                    backgroundColor: '#710808', // Red background color
                },
                headerTintColor: '#FFFFFF', // Text color in header
                headerTitleStyle: {
                    fontWeight: 'bold', // Style for header title
                },
            }}
        />
        <Stack.Screen 
            name="ListOfRequestDocx" 
            component={ListOfRequestDocx} 
            options={{
                headerTitle: 'List Of Request Documents',
                headerStyle: {
                    backgroundColor: '#710808', // Red background color
                },
                headerTintColor: '#FFFFFF', // Text color in header
                headerTitleStyle: {
                    fontWeight: 'bold', // Style for header title
                },
            }}
        />
    </Stack.Navigator>
);

const ServiceRecord = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Home_ServiceRecord" 
            component={SubScreen2} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const SecretaryStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="SecretaryScreen" 
            component={SecretaryScreen} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const RDRStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="RESIDENT DOCUMENT REQUEST" 
            component={ResidentDocumentRequest} 
            options={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#710808', // Set header background color to maroon
                },
                headerTintColor: '#fff', // Set header text color to white
                headerTitleAlign: 'center', // Center the header title
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: -8,
                         }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={40} color="white" />
                    </TouchableOpacity>
                ),
            })}
            />
            <Stack.Screen 
                name="PrintReceiptTreasurer" 
                component={PrintReceiptTreasurer} 
                options={{
                    headerTitle: 'PRINT RECEIPT',
                    headerStyle: {
                        backgroundColor: '#710808', // Red background color
                    },
                    headerTintColor: '#FFFFFF', // Text color in header
                    headerTitleStyle: {
                        fontWeight: 'regular', // Style for header title
                    },
                }}
            />
            <Stack.Screen 
                name="ViewDocumentRequestDetails" 
                component={ViewDocumentRequestDetails} 
                options={{
                    headerTitle: 'DOCUMENT REQUEST DETAILS',
                    headerStyle: {
                        backgroundColor: '#710808', // Red background color
                    },
                    headerTintColor: '#FFFFFF', // Text color in header
                    headerTitleStyle: {
                        fontWeight: 'bold', // Style for header title
                    },
                }}
            />
        </Stack.Navigator>
    );

    const ResidentRecordsStack = () => (
        <Stack.Navigator>
            <Stack.Screen 
                name="RESIDENT RECORDS" 
                component={ResidentRecords} 
                options={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: '#710808', // Set header background color to maroon
                    },
                    headerTintColor: '#fff', // Set header text color to white
                    headerTitleAlign: 'center', // Center the header title
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: -8,
                             }}
                            onPress={() => navigation.toggleDrawer()}
                        >
                            <Ionicons name="menu" size={40} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen 
                name="ViewRecordScreen" 
                component={ViewRecordScreen} 
                options={{
                    headerTitle: 'RESIDENT RECORDS',
                    headerStyle: {
                        backgroundColor: '#710808', // Red background color
                    },
                    headerTintColor: '#FFFFFF', // Text color in header
                    headerTitleStyle: {
                        fontWeight: 'regular', // Style for header title
                    },
                }}
            />
        </Stack.Navigator>
    );

const RARStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="RESIDENT ACCOUNT REQUEST" 
            component={ResidentAccountRequest} 
            options={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#710808', // Set header background color to maroon
                },
                headerTintColor: '#fff', // Set header text color to white
                headerTitleAlign: 'center', // Center the header title
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: -8,
                         }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={40} color="white" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);


const RRPStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="RESIDENT REGISTRATION" 
            component={ResidentRegistrationandProfiling} 
            options={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#710808', // Set header background color to maroon
                },
                headerTintColor: '#fff', // Set header text color to white
                headerTitleAlign: 'center', // Center the header title
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: -8,
                         }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={40} color="white" />
                    </TouchableOpacity>
                ),
            })}
        />
        <Stack.Screen 
            name="AddResidentRegister" 
            component={AddResidentRegister} 
            options={{
                headerTitle: 'RESIDENT REGISTRATION',
                headerStyle: {
                    backgroundColor: '#710808', // Red background color
                },
                headerTintColor: '#FFFFFF', // Text color in header
                headerTitleStyle: {
                    fontWeight: 'regular', // Style for header title
                },
            }}
        />
        <Stack.Screen 
            name="ResidentDetails" 
            component={ResidentDetails} 
            options={{
                headerTitle: 'RESIDENT DETAILS',
                headerStyle: {
                    backgroundColor: '#710808', // Red background color
                },
                headerTintColor: '#FFFFFF', // Text color in header
                headerTitleStyle: {
                    fontWeight: 'bold', // Style for header title
                },
            }}
        />
        <Stack.Screen 
            name="EditResident" 
            component={EditResident} 
            options={{
                headerTitle: 'EDIT RESIDENT',
                headerStyle: {
                    backgroundColor: '#710808', // Red background color
                },
                headerTintColor: '#FFFFFF', // Text color in header
                headerTitleStyle: {
                    fontWeight: 'regular', // Style for header title
                },
            }}
        />
        <Stack.Screen 
            name="ResidentHistory" 
            component={ResidentHistory} 
            options={{
                headerTitle: 'RESIDENT HISTORY',
                headerStyle: {
                    backgroundColor: '#710808', // Red background color
                },
                headerTintColor: '#FFFFFF', // Text color in header
                headerTitleStyle: {
                    fontWeight: 'regular', // Style for header title
                },
            }}
        />
    </Stack.Navigator>
);

const CensusDataStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="CENSUS DATA" 
            component={SubScreen4} 
            options={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#710808', // Set header background color to maroon
                },
                headerTintColor: '#fff', // Set header text color to white
                headerTitleAlign: 'center', // Center the header title
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: -8,
                         }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={40} color="white" />
                    </TouchableOpacity>
                ),
            })}
        />
        <Stack.Screen 
            name="AddCensusData" 
            component={AddCensusData} 
            options={{
                headerTitle: 'CENSUS DATA',
                headerStyle: {
                    backgroundColor: '#710808', // Red background color
                },
                headerTintColor: '#FFFFFF', // Text color in header
                headerTitleStyle: {
                    fontWeight: 'regular', // Style for header title
                },
            }}
        />
        <Stack.Screen 
            name="CensusDetails" 
            component={CensusDetails} 
            options={{
                headerTitle: 'CENSUS DETAILS',
                headerStyle: {
                    backgroundColor: '#710808', // Red background color
                },
                headerTintColor: '#FFFFFF', // Text color in header
                headerTitleStyle: {
                    fontWeight: 'bold', // Style for header title
                },
            }}
        />
        <Stack.Screen 
            name="EditCensusData" 
            component={EditCensusData} 
            options={{
                headerTitle: 'EDIT CENSUS DATA',
                headerStyle: {
                    backgroundColor: '#710808', // Red background color
                },
                headerTintColor: '#FFFFFF', // Text color in header
                headerTitleStyle: {
                    fontWeight: 'regular', // Style for header title
                },
            }}
        />
        <Stack.Screen 
            name="CensusHistory" 
            component={CensusHistory} 
            options={{
                headerTitle: 'CENSUS HISTORY',
                headerStyle: {
                    backgroundColor: '#710808', // Red background color
                },
                headerTintColor: '#FFFFFF', // Text color in header
                headerTitleStyle: {
                    fontWeight: 'regular', // Style for header title
                },
            }}
        />
    </Stack.Navigator>
);


const BPMStack = () => (
    <Stack.Navigator>
    <Stack.Screen 
        name="Budget Planning and monitoring" 
        component={FMAS5} 
        options={({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#710808', // Set header background color to maroon
            },
            headerTintColor: '#fff', // Set header text color to white
            headerTitleAlign: 'center', // Center the header title
            headerTitle: () => <CustomHeader_BPM navigation={navigation} />,
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginLeft: -8,
                     }}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Ionicons name="menu" size={40} color="white" />
                </TouchableOpacity>
            ),
        })}
    />
    <Stack.Screen 
        name="budgetadd" 
        component={AddBudget} 
        options={({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#710808', // Set header background color to maroon
            },
            headerTintColor: '#fff', // Set header text color to white
            headerTitleAlign: 'center', // Center the header title
            headerTitle: () => <CustomHeader_BPM navigation={navigation} />,
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginLeft: -8,
                     }}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Ionicons name="menu" size={40} color="white" />
                </TouchableOpacity>
            ),
        })}
    />
</Stack.Navigator>
);

  

  const RETStack = () => (
    <Stack.Navigator>
      <Stack.Screen 
        name="REVENUE AND EXPENSE TRACKING" 
        component={FMAS4} 
        options={({ navigation }) => ({
          headerStyle: {  
            backgroundColor: '#710808', // Set header background color to maroon
          },
          headerTintColor: '#fff', // Set header text color to white
          headerTitleAlign: 'center',
          headerTitle: () => <CustomHeaderTitle navigation={navigation} />,
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: -8 }}
              onPress={() => navigation.toggleDrawer()}
            >
              <Ionicons name="menu" size={40} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
       <Stack.Screen 
        name="transactadd" 
        component={TransactAdd} 
        options={({ navigation }) => ({
          headerStyle: {  
            backgroundColor: '#710808', // Set header background color to maroon
          },
          headerTintColor: '#fff', // Set header text color to white
          headerTitleAlign: 'center',
          headerTitle: () => <CustomHeaderTitle navigation={navigation} />,
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: -8 }}
              onPress={() => navigation.toggleDrawer()}
            >
              <Ionicons name="menu" size={40} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );

 

const PMStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="PAYROLL MANAGEMENT" 
            component={FMAS3} 
            options={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#710808', // Set header background color to maroon
                },
                headerTintColor: '#fff', // Set header text color to white
                headerTitleAlign: 'center', // Center the header title
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: -8,
                         }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={40} color="white" />
                    </TouchableOpacity>
                ),
            })}
        /><Stack.Screen 
        name="payrolladd" 
        component={AddPayroll} 
        options={({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#710808', // Set header background color to maroon
            },
            headerTintColor: '#fff', // Set header text color to white
            headerTitleAlign: 'center', // Center the header title
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginLeft: -8,
                     }}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Ionicons name="menu" size={40} color="white" />
                </TouchableOpacity>
            ),
        })}
    />
    </Stack.Navigator>
);

const FMStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="FINACIAL MANAGEMENT" 
            component={FMAS2} 
            options={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#710808', // Set header background color to maroon
                },
                headerTintColor: '#fff', // Set header text color to white
                headerTitleAlign: 'center', // Center the header title
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: -8,
                         }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={40} color="white" />
                    </TouchableOpacity>
                ),
            })}
        />
        <Stack.Screen 
            name="financialadd" 
            component={AddFinancial} 
            options={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#710808', // Set header background color to maroon
                },
                headerTintColor: '#fff', // Set header text color to white
                headerTitleAlign: 'center', // Center the header title
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: -8,
                         }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={40} color="white" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const AuditStack1 = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="AUDIT MANAGEMENT" 
            component={FMAS1} 
            options={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#710808', // Set header background color to maroon
                },
                headerTintColor: '#fff', // Set header text color to white
                headerTitleAlign: 'center', // Center the header title
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: -8,
                         }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={40} color="white" />
                    </TouchableOpacity>
                ),
            })}
        />
         <Stack.Screen 
            name="auditadd" 
            component={AuditAdd} 
            options={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#710808', // Set header background color to maroon
                },
                headerTintColor: '#fff', // Set header text color to white
                headerTitleAlign: 'center', // Center the header title
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: -8,
                         }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={40} color="white" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const BFStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="BLOTTER FORM" 
            component={IRCM2} 
            options={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#710808', // Set header background color to maroon
                },
                headerTintColor: '#fff', // Set header text color to white
                headerTitleAlign: 'center', // Center the header title
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: -8,
                         }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={40} color="white" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const BLStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="BLOTTER LIST" 
            component={IRCM1} 
            options={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#710808', // Set header background color to maroon
                },
                headerTintColor: '#fff', // Set header text color to white
                headerTitleAlign: 'center', // Center the header title
                headerLeft: () => (
                    <TouchableOpacity
                    style={{ marginLeft: -8,
                     }}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Ionicons name="menu" size={40} color="white" />
                </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const CSStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="CASE REPORT" 
            component={IRCM3} 
            options={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#710808', // Set header background color to maroon
                },
                headerTintColor: '#fff', // Set header text color to white
                headerTitleAlign: 'center', // Center the header title
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: -8,
                         }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={40} color="white" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const SSCStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="SUMMON SCHEDULE" 
            component={IRCM4} 
            options={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#710808', // Set header background color to maroon
                },
                headerTintColor: '#fff', // Set header text color to white
                headerTitleAlign: 'center', // Center the header title
                headerLeft: () => (
                    <TouchableOpacity
                    style={{ marginLeft: -8,
                     }}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Ionicons name="menu" size={40} color="white" />
                </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);


const DBStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Dashboard" 
            component={CDSM1} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);


const PPSStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="ProgramPlanningandSchedulin" 
            component={CDSM2} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);


const EventStack = () => (
    <Stack.Navigator>
      <Stack.Screen 
        name="Eventss" 
        component={CEvents} 
        options={({ navigation }) => ({
          headerStyle: {  
            backgroundColor: '#710808', // Set header background color to maroon
          },
          headerTintColor: '#fff', // Set header text color to white
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: -8 }}
              onPress={() => navigation.toggleDrawer()}
            >
              <Ionicons name="menu" size={40} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
         <Stack.Screen
        name="EventsList"
        component={EventsResidents}
        options={{
          title: 'Events',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons
                name="menu"
                size={28}
                color="#FFFFFF"
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="EventOverview"
        component={EventOverview}
        options={{ title: 'Event Overview' }}
      />
      <Stack.Screen
        name="SubmitRequirements"
        component={SubmitRequirements}
        options={{ title: 'Submit Requirements' }}
      />
    </Stack.Navigator>
);


const RMStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Resource Management" 
            component={CResources} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
      
       <Stack.Screen
  name="SeeMore"
  component={SeeMore}
  options={{ title: 'Beneficiary Details' }}
/>
    </Stack.Navigator>
);




const BDStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Budget Dashboard" 
            component={FMASSUB1} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const ADStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Add Budget" 
            component={FMASSUB2} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const EBStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Edit Budget" 
            component={FMASSUB3} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const BRStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Budget Report" 
            component={FMASSUB4} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);



const NotifStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Notification" 
            component={NotifStack} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const TDStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Transaction Dashboard" 
            component={FMASSUB5} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const ATStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Add Transaction" 
            component={FMASSUB6} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const ETStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Edit Transaction" 
            component={FMASSUB7} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const TRStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Transaction Report" 
            component={FMASSUB8} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const PTStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Payroll Table" 
            component={FMASSUB9} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const APStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Add Payroll" 
            component={FMASSUB10} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const EPStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Edit Payroll" 
            component={FMASSUB11} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const PRStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Payroll Report" 
            component={FMASSUB12} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const FTStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Financial Table" 
            component={FMASSUB13} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const FRStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Financial Report" 
            component={FMASSUB14} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const ATTStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Audit Table" 
            component={FMASSUB15} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const ARStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Audit Report" 
            component={FMASSUB16} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const CalendarStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="PPS_Calendar" 
            component={CCalendar} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const PPStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="ProposedProgram" 
            component={CDSMSUB2} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const PSStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Program Schedule" 
            component={CDSMSUB3} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
    </Stack.Navigator>
);

const PRRStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="ApprovedProgram" 
            component={CProposedProgram} 
            options={({ navigation }) => ({
                header: () => <Header_subscreen navigation={navigation} />,
                headerLeft: () => (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Ionicons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                ),
            })}
        />
        <Stack.Screen
        name="KProposedProgram"
        component={KProposedProgram}
        options={({ navigation }) => ({
          title: 'Proposed Program',
          headerLeft: () => <DrawerToggleButton navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
);

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: '#ffffff',
                drawerActiveTintColor: '#000',
                drawerInactiveTintColor: '#fff',
                drawerStyle: {
                    backgroundColor: '#710808', // Set the background color of the drawer to maroon
                },
                drawerLabelStyle: {
                    marginLeft: -20,
                    fontFamily: 'Roboto',
                    fontSize: 15,
                },
            }}
        >
            <Drawer.Screen
                name="Home1"
                component={HomeStack}
                options={({ navigation }) => ({
                    header: () => <Header_subscreen navigation={navigation} />,
                    // No drawerLabel option means the label will not be shown
                })}
            />
            <Drawer.Screen
                name="RequestDocument"
                component={RequestDocumentStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
            <Drawer.Screen
                name="ServiceRecord"
                component={ServiceRecord}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
            <Drawer.Screen
                name="ResidentDocumentRequest"
                component={RDRStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
            <Drawer.Screen
                name="ResidentRecords"
                component={ResidentRecordsStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
             <Drawer.Screen
                name="programSched"
                component={ProgramSchedStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
            <Drawer.Screen
                name="ResidentAccountRequest"
                component={RARStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
            <Drawer.Screen
                name="ResidentRegistrationandProfiling"
                component={RRPStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
                <Drawer.Screen
                    name="CensusData"
                    component={CensusDataStack}
                    options={{
                        headerShown: false,
                    }}
                />
                <Drawer.Screen
                    name="BudgetPlanningandMonitoring"
                    component={BPMStack}
                    options={({ navigation }) => ({
                        header: () => <Header_subscreen navigation={navigation} />,
                    })}
                />
            <Drawer.Screen
                name="RevenueandExpenseTracking"
                component={RETStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
            <Drawer.Screen
                name="PayrollManagement"
                component={PMStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
            <Drawer.Screen
                name="FinancialManagement"
                component={FMStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
            <Drawer.Screen
                name="AuditsManagement"
                component={AuditStack1}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
                <Drawer.Screen
                name="BlotterForm"
                component={BFStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
            <Drawer.Screen
                name="BlotterList"
                component={BLStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
            <Drawer.Screen
                name="CaseReport"
                component={CSStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
            <Drawer.Screen
                name="SummonSchedule"
                component={SSCStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
                <Drawer.Screen
                name="Dashboard"
                component={DBStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
            <Drawer.Screen
                name="ProgramPlanningandSchedulin"
                component={PPSStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
                <Drawer.Screen
                name="Events"
                component={EventsStackNavigator}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
            <Drawer.Screen
                name="ResourceManagement"
                component={RMStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
            <Drawer.Screen
                name="BeneficiaryManagement"
                component={BM}
               options={{
                    headerShown: true,
                    // No drawerLabel option means the label will not be shown
                }}
            />
            <Drawer.Screen
                name="Notification"
                component={NotificationsStackNavigator}
                options={{ header: () => <Header_subscreen title={'Welcome'} /> }}
             />
              <Drawer.Screen
                name="BudgetDashboard"
                component={BDStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
              <Drawer.Screen
                name="AddBudget"
                component={ADStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
              <Drawer.Screen
                name="EditBudget"
                component={EBStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
                        <Drawer.Screen
                name="Reports"
                component={ReportsStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
              <Drawer.Screen
                name="BudgetReport"
                component={BRStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
              <Drawer.Screen
                name="TransactionDashboard"
                component={TDStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
              <Drawer.Screen
                name="AddTransaction"
                component={ATStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
              <Drawer.Screen
                name="EditTransaction"
                component={ETStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
              <Drawer.Screen
                name="TransactionReport"
                component={TRStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
                <Drawer.Screen
                name="PayrollTable"
                component={PTStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
              <Drawer.Screen
                name="AddPayroll"
                component={APStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
              <Drawer.Screen
                name="EditPayroll"
                component={EPStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
              <Drawer.Screen
                name="PayrollReport"
                component={PRStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
                     <Drawer.Screen
                name="FinancialTable"
                component={FTStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
              <Drawer.Screen
                name="AuditTable"
                component={ATTStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
                    <Drawer.Screen
                name="AuditReport"
                component={ARStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
              <Drawer.Screen
                name="FinancialReport"
                component={FRStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
                            <Drawer.Screen
                name="Calendar"
                component={CalendarStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
              <Drawer.Screen
                name="Proposed Program"
                component={CProposedProgram}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
                    <Drawer.Screen
                name="Program Schedule"
                component={ProgramStack}
                options={{
                    headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
                <Drawer.Screen
                name="Approved Program"
                component={PRRStack}
                options={{
                headerShown: false,
                    // No drawerLabel option means the label will not be shown
                }}
            />
                <Drawer.Screen
                name="programlist"
                component={Programlist}
                options={{ headerShown: false }}
            />
                <Drawer.Screen
                name="programadd"
                component={ProgramAdd}
                options={{ headerShown: false }}
            />
        </Drawer.Navigator>
    );
}

export default function App() {
    return (

            <UserRoleProvider>
                <Stack.Navigator initialRouteName="Splash">
                    <Stack.Screen
                    name="Splash"
                    component={SplashScreens}
                    options={{ headerShown: false }}
                    />
                    <Stack.Screen
                    name="LogIn"
                    component={LoginScreen}
                    options={{ header: () => <CustomHeader title={'Welcome'} /> }}
                    />
                    <Stack.Screen
                    name="Homes"
                    component={DrawerNavigator}
                    options={{ headerShown: false }}
                    />
                      <Stack.Screen
                    name="Event"
                    component={ProgramStack}
                    options={{ headerShown: false }}
                    />
               
                    <Stack.Screen
                    name="Notification"
                    component={NotificationStack}
                    options={{ headerShown: false }}
                    />
                    <Stack.Screen
                    name="Register"
                    component={RegisterStack}
                    options={{
                        headerShown: false,
                }}
                
                />
                    <Stack.Screen
                    name="Secretary"
                    component={SecretaryStack}
                    options={{
                        headerShown: false,
                }}
                
                />

      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={({ navigation }) => ({
          title: 'Dashboard',
          headerLeft: () => <DrawerToggleButton navigation={navigation} />,
        })}
      />
       <Stack.Screen
        name="CPending"
        component={CPending}
        options={{ title: 'Pending' }}
      />
        <Stack.Screen
        name="SYearDetails"
        component={CYearDetails}
        options={{ title: 'Year Details' }}
      />
      <Stack.Screen
        name="CCalendar"
        component={CCalendar}
        options={({ navigation }) => ({
          title: 'Calendar',
          headerLeft: () => <DrawerToggleButton navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="CProposedProgram"
        component={CProposedProgram}
        options={({ navigation }) => ({
          title: 'Proposed Program',
          headerLeft: () => <DrawerToggleButton navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="CExpenses"
        component={CExpenses}
        options={{ title: 'Other Expenses' }}
      />
        <Stack.Screen
        name="SCalendar"
        component={SCalendar}
        options={({ navigation }) => ({
          title: 'Calendar',
          headerLeft: () => <DrawerToggleButton navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Agenda"
        component={Agenda}
        options={{ title: 'Agenda' }}
      />
      <Stack.Screen
        name="Attendance"
        component={Attendance}
        options={{ title: 'Attendance' }}
      />
        <Stack.Screen
        name="SOtherExpenses"
        component={SOtherExpenses}
        options={{ title: 'Other Expenses' }}
      />
       <Stack.Screen
        name="SConfirmMeeting"
        component={SConfirmMeeting}
        options={{ title: 'Confirmation' }}
      />

      <Stack.Screen
        name="SApprovedProgram"
        component={SApprovedProgram}
        options={({ navigation }) => ({
          title: 'Approved Program',
          headerLeft: () => <DrawerToggleButton navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="SeeDetails"
        component={SeeDetails}
        options={{ title: 'Program Details' }}
      />
      <Stack.Screen
        name="CEvents"
        component={CEvents}
        options={({ navigation }) => ({
          title: 'Events',
          headerLeft: () => <DrawerToggleButton navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="CResources"
        component={CResources}
        options={({ navigation }) => ({
          title: 'Resources',
          headerLeft: () => <DrawerToggleButton navigation={navigation} />,
        })}
      />
        <Stack.Screen
        name="CFunds"
        component={CFunds}
        options={{ title: 'Funds' }}
      />
        <Stack.Screen
        name="CMaterials"
        component={CMaterials}
        options={{ title: 'Materials' }}
      />
    
      <Stack.Screen
        name="Applicants"
        component={Applicants}
        options={{ title: 'Applicants' }}
      />
        <Stack.Screen
        name="History"
        component={History}
        options={{ title: 'History' }}
      />
     <Stack.Screen
        name="programs"
        component={Programs}
        options={{ title: <Text>'Program List'</Text> }}
      />
      <Stack.Screen
        name="programdetail"
        component={ProgramDetail}
        options={{ title: <Text>'Program Detail'</Text> }}
      />
      <Stack.Screen
        name="budgetadd"
        component={AddBudget}
        options={{ title: <Text>'Add Budget'</Text> }}
      />
      <Stack.Screen
        name="transactadd"
        component={TransactAdd}
        options={{ title: <Text>'Add Transaction'</Text> }}
      />
      <Stack.Screen
        name="payrolladd"
        component={AddPayroll}
        options={{ title: <Text>'Add Payroll'</Text> }}
      />
      <Stack.Screen
        name="financialadd"
        component={AddFinancial}
        options={{ title: <Text>'Add Financial Report'</Text> }}
      />
      <Stack.Screen
        name="BeneficiaryRequests"
        component={BeneficiaryRequests}
        options={({ navigation }) => ({
            headerTitle: 'BENEFICIARY REQUEST',
            headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#710808', // Red background color
                },
                headerTintColor: '#FFFFFF', // Text color in header
                headerTitleStyle: {
                    fontWeight: 'bold', // Style for header title
                
                },
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginStart: 'auto', }}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Ionicons name="menu" size={40} color="white" />
                </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
      name="DetailedView"
        component={DetailedView}
        options={({ navigation }) => ({
            headerTitle: 'BENEFICIARY REQUEST',
            headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#710808', // Red background color
                },
                headerTintColor: '#FFFFFF', // Text color in header
                headerTitleStyle: {
                    fontWeight: 'bold', // Style for header title
                
                },
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginStart: 'auto', }}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Ionicons name="menu" size={40} color="white" />
                </TouchableOpacity>
            ),
        })}
        
      />
      
            </Stack.Navigator>
          </UserRoleProvider>


    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    drawerItemText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
      },

      mainMenuItem: {
        padding: 10,
        backgroundColor: '#eee',
        marginBottom: 10,
      },
      screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
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
      submenu: {
        paddingLeft: 20,
      },
      drawerSubItemText: {
        fontSize: 16,
        color: 'white',
      },


      titleContainer: {
        alignItems: 'center',
      },
      titleText: {
        color: '#fff', // Header text color
        textAlign: 'center',
        fontSize: 18,
      },

});