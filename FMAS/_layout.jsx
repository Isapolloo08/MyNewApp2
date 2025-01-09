import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native'; 
import Main from './main';
import Budgets from './budgets';
import AddBudget from './budgetadd';
import Programs from './programs';
import ProgramDetail from './programdetail';
import Transact from './transact';
import TransactAdd from './transactadd';
import Payroll from './payroll';
import AddPayroll from './payrolladd';
import Financial from './financial';
import AddFinancial from './financialadd';
import Audit from './audit';

const Stack = createStackNavigator();

export default function Layout() {
  return (
    <Stack.Navigator
      initialRouteName="main"
      screenOptions={{
        headerStyle: { backgroundColor: '#710808' },
        headerTitleStyle: { color: '#fff' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="main"
        component={Main}
        options={{ title: <Text>'Financial Management and Accounting System'</Text> }}
      />
      <Stack.Screen
        name="budgets"
        component={Budgets}
        options={{ title: <Text>'Budget Planning and Monitoring'</Text> }}
      />
      <Stack.Screen
        name="transact"
        component={Transact}
        options={{ title: <Text>'Revenue and Expense Tracking'</Text> }}
      />
      <Stack.Screen
        name="payroll"
        component={Payroll}
        options={{ title: <Text>'Payroll Management'</Text> }}
      />
      <Stack.Screen
        name="financial"
        component={Financial}
        options={{ title: <Text>'Financial Reports'</Text> }}
      />
      <Stack.Screen
        name="audit"
        component={Audit}
        options={{ title: <Text>'Audit Trail'</Text> }}
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
    </Stack.Navigator>
  );
}
