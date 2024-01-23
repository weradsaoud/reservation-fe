import { useEffect, useState } from "react";
import { getAppUser } from "../../services/authService";
import { AppUser } from "../../models/appUser";
import { Reservation } from "../../models/reservation";
import axios from "axios";
import { baseUrl, getUserReservationUrl } from "../../config";
import Loader from "../loader/loader";
import { useNavigate } from "react-router-dom";
import Pathes from "../../router/pathes";


function Home() {
    const [appUser, setAppUser] = useState(new AppUser());
    const [reservations, setReservations] = useState(Array<Reservation>);
    const [Loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        let appUser = getAppUser();
        if (appUser) {
            console.log("appUser: ", appUser);
            
            setAppUser(appUser);
            axios.get(baseUrl + getUserReservationUrl, {
                headers: {
                    Authorization: appUser?.idToken
                }
            }).then((res) => {
                console.log("res: ", res);

                setReservations(res.data);
                setLoading(false);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            });
        };
    }, [])

    return (
        <div>
            {Loading ? <Loader /> : <div>
                {reservations.length === 0 ? <div>Dear {appUser.name}, you do not have any reservations</div> : reservations.map((r, index) => <div key={index}>
                    <div className="w-fit sm:w-[400px] rounded mb-2 overflow-hidden shadow-lg bg-white">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{r.name}</div>
                            <p className="text-gray-700 text-base">{r.date}</p>
                        </div>
                    </div>
                </div>)}
                <div className="mt-10">
                    <button
                    onClick={() => navigate(Pathes.reservePath)}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Reserve
                    </button>
                </div>
            </div>}
        </div>
    );
}

export default Home;