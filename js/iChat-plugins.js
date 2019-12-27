var me = new iChatPlugin("action/me", function (data) {
  if (data.txt.startsWith("/me ")) {
    data.txt = "*" + data.u + " " + data.txt.substring(4);
    data.u = false;
  }
  return data;
}, "Written by jcgter777, using code from _iPhoenix_.");

var pm = new iChatPlugin("action/pm", function (data) {
  if (data.txt.startsWith("/pm ")) {
    var recipient = data.txt.match(/(\S+)/g)[1];
    if (data.u === firebase.auth().currentUser.displayName) {
      data.u = "[ You => " + recipient + "]";
      data.txt = data.txt.substring(4 + recipient.length);
    } else {
      if (firebase.auth().currentUser.displayName === recipient) {
        data.u = "[ " + data.u + " => You ]";
        data.txt = data.txt.substring(4 + recipient.length);
      } else {
        data.txt = "";
      }
    }
  }
  return data;
}, "Written by _iPhoenix_");

const time = new iChatPlugin("thebutton/time", function(data) {
  let txt = data.txt.trim();
  if (txt.startsWith("!time")) {
    let user = "";
    if (txt == "!time") {
      user = data.u;
    } else {
      user = txt.split(" ")[1].match(/(\w{2,32})/)[1];
    }
    if (user.length) {
      function format(n) {
        if (n) {
          var r = n / 1e3,
            t = r / 60,
            o = t / 60,
            e = o / 24;

          function u(n, r) {
            return (n = Math.floor(n)) + " " + r + (1 == n ? "" : "s") + ", ";
          }
          return t %= 60, o %= 24, r = u(r %= 60, "second"), t = u(t, "minute"), o = u(o, "hour"), (e = u(e, "day")) + o + t + "and " + (r = r.substring(0, r.length - 2));
        }
        return "No time.";
      }

      firebase.database().ref("/button/users/" + user).once("value", function(snapshot) {
        let id = iChat.renderMessage({
          ts: Date.now(),
          u: "TheButton",
          txt: user + " has " + format(snapshot.val())
        });

        firebase.database().ref("/button/users/" + user).on("value", function(snapshot) {
          iChat.updateMessage(id, {
            "txt": user + " has " + format(snapshot.val())
          });
        });
      });
    }
  }
  return data;
}, "Written by _iPhoenix_");

iChat.onload = function () {
  iChat.registerPlugins(me, pm, time);
}
