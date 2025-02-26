import { Component} from "react";
import { User } from "../entities/User";
import authService from "../util/AuthService";

interface DashboardProps{
}
interface DashboardState{
    user: User | null;
}

class Dashboard extends Component<DashboardProps,DashboardState>{ 
    constructor(props:DashboardProps){
        super(props);
        this.state={
            user: authService.getUser()
        }
    };


    
    render(){
        if (!authService.isAuthenticated()) {
            return <p>Kérlek jelentkezz be hogy lásd az oldalt</p>;
        }
    
        return (
        <div>
            <h1>Dashboard</h1>
            <p>User: {this.state.user?.username}</p> <br />
            <p>Email {this.state.user?.email}</p>
        </div>
    );
    }
}

export default Dashboard;