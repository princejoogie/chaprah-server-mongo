import dotenv from "dotenv";
import mongoose from "mongoose";
import colors from "colors";
import { UserData } from "./data";
import { User } from "../models";

dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI ?? "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(colors.green("[✓] Connected to Database."));

    console.log(colors.gray("[.] Dropping database..."));
    await db.connection.dropDatabase();
    console.log(colors.green("[✓] Finished Dropping database."));

    console.log(colors.gray("[.] USERS - Creating..."));
    for (let i = 0; i < UserData.length; i++) {
      const { email, password, username } = UserData[i];
      const u = User.build({
        email,
        password,
        username,
      });
      await u.save();
    }
    console.log(colors.green("[✓] USERS - Done."));

    process.exit(0);
  } catch (err) {
    console.log(colors.red("[✗] Something went wrong."));
    console.log(colors.red(`    > ${err.message}`));

    process.exit(1);
  }
})();
