import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './src/navigation/BottomNavigationTab';
import AddVehicle from './src/pages/AddVehicle';
export default function App() {
  
 
  return (
    <NavigationContainer>
     <AddVehicle></AddVehicle>
    </NavigationContainer>
  );
  
}
