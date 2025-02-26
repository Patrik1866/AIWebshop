import { Component } from "react";
import Dashboard from "../components/Dashboard";

interface DashboardPageProps{

}
interface DashboardPageState{

}


class DashboardPage extends Component<DashboardPageProps,DashboardPageState>{
    constructor(props:DashboardPageProps){
        super(props);
        this.state={

        }
    } 

    render(){
    return <Dashboard>

    </Dashboard >
    }
}
export default DashboardPage