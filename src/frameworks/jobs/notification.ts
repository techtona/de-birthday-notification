import cron from "node-cron"
import dotenv from "dotenv"
import User from "../database/postgres/models/user"
import hookbinServices from "../services/hookbinServices"
dotenv.config()

const birthdayNotificationScheduler = async () => {
    // Get all user data
    const users = await User.findAll({
        raw: true,
    });

    users.forEach((user) => {
        const birthdate = new Date(user.date_of_birth);
        const day = birthdate.getDate();
        const month = birthdate.getMonth() + 1;
        const msg = `Hey, ${user.first_name} ${user.last_name} it’s your birthday`;
        // Schedule all tasks sends notification at 9 AM on user's birthday
        cron.schedule(`* 9 ${day} ${month} *`, () => {
            // Send request
            hookbinServices.request({message: msg})
        }, {
            scheduled: true,
            timezone: user.timezone,
        });
    });
}
export default { birthdayNotificationScheduler }