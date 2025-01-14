import ConnectyCube from "connectycube";

class AuthService {
  arr = [];
  constructor() {
    this.init();
  }

  init = () => {
    const appConfig = {
      debug: {
        mode: 1,
        conference: {
          server: "wss://janus.connectycube:8989",
        },
      },
      endpoints: {
        api: "api.connectycube.com",
        chat: "chat.connectycube.com",
      },
    };
    const defLogin = () => {
      const credentials = {
        appId: "7679",
        authKey: "ZNVEHaBPpdzYRK9",
        authSecret: "U2VPwkDWOAmcs2G",
        chat: {
          streamManagement: {
            enable: true,
          },
        },
      };

      ConnectyCube.init(credentials, appConfig);
    };
    const tokenLogin = (token) => {
      const CREDENTIALS = {
        appId: "7679",
        token: token.token,
      };
      ConnectyCube.init(CREDENTIALS, appConfig);
    };

    if (localStorage.token && localStorage.login && localStorage.userId) {
      let token = JSON.parse(localStorage.token);
      let creationDate = new Date(token.timestamp);
      let creationDay = creationDate.getDay();
      let creationHour = creationDate.getHours();
      let nowHour = new Date().getHours();
      let nowDay = new Date().getDay();
      if (nowHour - creationHour >= 2 || nowDay !== creationDay) {
        localStorage.removeItem("token");
        defLogin();
      } else {
        tokenLogin(token);
      }
    } else {
      defLogin();
    }
  };

  login = (login, password) => {
    const userCredentials = { login: login, password: password };
    return new Promise((resolve, reject) => {
      ConnectyCube.createSession(userCredentials)
        .then((session) => {
          if (!localStorage.token) {
            localStorage.setItem("login", login);
            let object = {
              token: session.token,
              timestamp: new Date().getTime(),
            };
            localStorage.setItem("token", JSON.stringify(object));
            localStorage.setItem("userId", session.user_id);
          }
          ConnectyCube.login(userCredentials)
            .then((user) => {
              resolve({ userInfo: user, password: password });
            })
            .catch((error) => {
              localStorage.removeItem("token");
            });
        })
        .catch((error) => {
          reject();
        });
    });
  };

  logout = () => {
    return new Promise((resolve, reject) => {
      ConnectyCube.logout()
        .then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("login");
          localStorage.removeItem("userId");
          resolve();
        })
        .catch((error) => {
          console.error(error);
          localStorage.removeItem("token");
          localStorage.removeItem("login");
          localStorage.removeItem("userId");
        });
    });
  };

  signup = (userName, login, password) => {
    return new Promise((resolve, reject) => {
      ConnectyCube.createSession().then((session) => {
        const userProfile = {
          login: login,
          full_name: userName,
          password: password,
        };

        ConnectyCube.users
          .signup(userProfile)
          .then((user) => {
            console.log("User Registrated");
            console.table(user);
            resolve(user);
          })
          .catch((error) => {
            console.log(error);
            reject();
          });
      });
    });
  };
}

const Auth = new AuthService();
export default Auth;
