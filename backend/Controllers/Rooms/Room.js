const {RoomModel} = require("../../Entity/roomSchema")

const add_room = async(req,res) =>{
    let {name, boxes} = req.body
  
    const data = await RoomModel.find({name})
    if(data.length === 0){
        const newData = new RoomModel({name, boxes})
        await newData.save()
        return res.status(200).json({message : "Room added successfully..."})
    }
    else{
        return res.status(201).json({message : "Room already existed.."})
    }
}

const get_all_rooms = async(req,res) =>{
    let rooms = await RoomModel.find()
    res.send(rooms)
}

const update_room = async (req, res) => {
  const { currentRoomName, currentRoomNumber, previousRoomName, previousRoomNumber } = req.body;
  console.log(currentRoomName, currentRoomNumber, previousRoomName, previousRoomNumber)

  try {
    // Find the current room and update the current box
    const currentRoom = await RoomModel.findOne({ name: currentRoomName });

    if (!currentRoom) {
      console.log("No matching current room found");
      return res.status(404).send("No matching current room found");
    }

    let currentBoxUpdated = false;

    for (let i = 0; i < currentRoom.boxes.length; i++) {
      const innerArray = currentRoom.boxes[i];
      for (let j = 0; j < innerArray.length; j++) {
        const box = innerArray[j];
        if (box.roomNumber === currentRoomNumber) {
          box.is_alloted = true;
          console.log(box, "Updated current box");
          currentBoxUpdated = true;
          break;
        }
      }
      if (currentBoxUpdated) {
        break;
      }
    }

    // If the current box was updated, save the changes
    if (currentBoxUpdated) {
      await currentRoom.save();
    } else {
      console.log("No matching current box found");
      return res.status(404).send("No matching current box found");
    }

    // If there's a previous room, find and update the previous box
    if (previousRoomName) {
      const previousRoom = await RoomModel.findOne({ name: previousRoomName });

      if (!previousRoom) {
        console.log("No matching previous room found");
        return res.status(404).send("No matching previous room found");
      }

      let previousBoxUpdated = false;

      for (let i = 0; i < previousRoom.boxes.length; i++) {
        const innerArray = previousRoom.boxes[i];
        for (let j = 0; j < innerArray.length; j++) {
          const box = innerArray[j];
          if (box.roomNumber === previousRoomNumber) {
            box.is_alloted = false;
            console.log(box, "Updated previous box");
            previousBoxUpdated = true;
            break;
          }
        }
        if (previousBoxUpdated) {
          break;
        }
      }

      // If the previous box was updated, save the changes
      if (previousBoxUpdated) {
        await previousRoom.save();
      } else {
        console.log("No matching previous box found");
        return res.status(404).send("No matching previous box found");
      }
    }

    // Respond once both updates are completed
    console.log("Box updates completed successfully");
    res.status(200).send("Box updates completed successfully");
  } catch (error) {
    console.error("Error updating boxes:", error);
    res.status(500).send("Error updating boxes");
  }
};

// const update_room = async (req, res) => {
//   const { currentRoomName, currentRoomNumber, previousRoomName, previousRoomNumber } = req.body;

//   try {
//     const room = await RoomModel.findOne({ name: currentRoomName });

//     if (!room) {
//       console.log("No matching room found");
//       return res.status(404).send("No matching room found");
//     }

//     let boxUpdated = false;

//     for (let i = 0; i < room.boxes.length; i++) {
//       const innerArray = room.boxes[i];
//       for (let j = 0; j < innerArray.length; j++) {
//         const box = innerArray[j];
//         if (box.roomNumber === currentRoomNumber) {
//           box.is_alloted = true;
//           console.log(box, "first")
//           boxUpdated = true;
//           break;
//         }
//       }
//       if (boxUpdated) {
//         break;
//       }
//     }

//     if (boxUpdated) {
//       await room.save();

//      //if user is already alloted a room then deselect it
//     if (previousRoomName ==""){
//       res.send(200).send("room update successfully")
//     }
     
//     else{
//         const room1 = await RoomModel.findOne({ name: previousRoomName });
  
//       if (!room1) {
//         console.log("No matching room found");
//         return res.status(404).send("No matching room found");
//       }
//       let boxUpdated = false;
//       for (let i = 0; i < room1.boxes.length; i++) {
//         const innerArray = room1.boxes[i];
//         for (let j = 0; j < innerArray.length; j++) {
//           const box = innerArray[j];
//           if (box.roomNumber === previousRoomNumber) {
//             box.is_alloted = false;
//             console.log(box, "second")
//             boxUpdated = true;
//             break;
//           }
//         }
//         if (boxUpdated) {
//           break;
//         }
//       }
  
//       if (boxUpdated) {
//         await room1.save();
//         console.log("Box updated successfully");
//         res.status(200).send("Box updated successfully");
//       } else {
//         console.log("No matching box found");
//         res.status(404).send("No matching box found");
//       }
//       }
  
  
      
//     } else {
//       console.log("No matching box found");
//       res.status(404).send("No matching box found");
//     }


    

//   } catch (error) {
//     console.error("Error updating box:", error);
//     res.status(500).send("Error updating box");
//   }
// };






module.exports = {
    add_room,
    get_all_rooms,
    update_room
}