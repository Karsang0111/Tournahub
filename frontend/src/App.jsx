import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './Components/Header/Header'
import Home from './Pages/Pages/User/Home/Home'
import Auth from './Pages/Auth/Auth'
import Tournament from './Pages/Pages/User/Tournaments/Tournament'
import TournamentDetails from './Pages/Pages/User/TournamentDetails/TournamentDetails'
import Footer from './Components/Footer/Footer'
import SidebarHeader from './Components/SidebarHeader/SidebarHeader'

import Dashboard from './Pages/Pages/Admin/Dashboard/Dashboard'
import Users from './Pages/Pages/Admin/OrganizorPages/RegisteredTeams'
import RegisteredTeams from './Pages/Pages/Admin/OrganizorPages/RegisteredTeams'
import OrganizedTournaments from './Pages/Pages/Admin/OrganizorPages/OrganizedTournaments'
import Winners from './Pages/Pages/Admin/OrganizorPages/Winners'
import MatchSchedules from './Pages/Pages/Admin/OrganizorPages/MatchSchedule'
import UpcommingMatches from './Pages/Pages/Admin/OrganizorPages/UpcommingMatches'
import RegisterTournament from './Pages/Pages/Admin/OrganizorPages/RegisterTournament'
import AddWinners from './Pages/Pages/Admin/OrganizorPages/AddWinners'

import UsersAdmin from './Pages/Pages/Admin/AdminPages/RegisteredTeams'
import RegisteredTeamsAdmin from './Pages/Pages/Admin/AdminPages/RegisteredTeams'
import OrganizedTournamentsAdmin from './Pages/Pages/Admin/AdminPages/OrganizedTournaments'
import WinnersAdmin from './Pages/Pages/Admin/AdminPages/Winners'
import MatchSchedulesAdmin from './Pages/Pages/Admin/AdminPages/MatchSchedule'
import UpcommingMatchesAdmin from './Pages/Pages/Admin/AdminPages/UpcommingMatches'
import RegisterTournamentAdmin from './Pages/Pages/Admin/AdminPages/RegisterTournament'
import AddWinnersAdmin from './Pages/Pages/Admin/AdminPages/AddWinners'

const App = () => {
  const location = useLocation();
  const isAdminOrOrganizer = location.pathname.startsWith('/admin') || location.pathname.startsWith('/organizer');

  return (
    <>
      {isAdminOrOrganizer ? <SidebarHeader /> : <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/tournament" element={<Tournament />} />
        <Route path="/tournament/:slug" element={
          <TournamentDetails />
        } />

        <Route path="/admin/registered-teams" element={<RegisteredTeamsAdmin />} />
        <Route path="/admin/organized-tournaments" element={<OrganizedTournamentsAdmin />} />
        <Route path="/admin/winners" element={<WinnersAdmin />} />
        <Route path="/admin/match-schedule" element={<MatchSchedulesAdmin />} />
        <Route path="/admin/upcoming-matches" element={<UpcommingMatchesAdmin />} />
        <Route path="/admin/register-tournament" element={<RegisterTournamentAdmin />} />
        <Route path="/admin/add-winners" element={<AddWinnersAdmin />} />

        <Route path="/organizer/dashboard" element={<Dashboard />} />
        <Route path="/organizer/registered-teams" element={<RegisteredTeams />} />
        <Route path="/organizer/organized-tournaments" element={<OrganizedTournaments />} />
        <Route path="/organizer/winners" element={<Winners />} />
        <Route path="/organizer/match-schedule" element={<MatchSchedules />} />
        <Route path="/organizer/register-tournament" element={<RegisterTournament />} />
        <Route path="/organizer/add-winners" element={<AddWinners />} />

      </Routes>

      {!isAdminOrOrganizer && <Footer />}
    </>
  );
};

export default App;
