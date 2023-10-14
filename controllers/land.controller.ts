import { Request, Response } from "express";
import { Land } from "../models/land.model";
import { newRequest } from "./request.controller";
import { getUser } from "./user.controller";
import { RequestModel } from "../models/request.model";
import axios from "axios";

const getAllLands = async (req: Request, res: Response) => {
  await Land.find({})
    .then((r) => res.status(200).send(r))
    .catch((err) => res.status(500).send({ data: err.message }));
};

const addLand = async (req: Request, res: Response) => {
  const {
    nationalId,
    publicId,
    division,
    district,
    state,
    owner,
    village,
    postOffice,
    propertyId,
    price,
    isForSale,
  } = req.body;

  let file = req.files as Express.Multer.File[];
  let images: string[] = [];

  file.forEach((f: Express.Multer.File) => {
    images.push(f.filename as string);
  });

  let user: any;
  await getUser(owner)
    .then((r) => {
      user = r[0];
    })
    .catch((err) => {
      console.log(err);
    });

  // verify owner

  const master_api = process.env.MASTER_SERVER_URL;

  console.log(master_api);

  axios
    .get(master_api + "Lands/propertyId/" + propertyId)
    .then((r) => {
      console.log(r.data.owner.nationalId, nationalId);
      if (r.data.owner.nationalId === nationalId) {
        const land = new Land({
          nationalId: nationalId,
          publicId: publicId,
          division: division,
          district: district,
          state: state,
          owner: user || owner,
          landImages: images,
          village: village,
          postOffice: postOffice,
          propertyId: propertyId,
          status: false,
          price: price,
          isForSale: isForSale,
        });

        land
          .save()
          .then((l) => {
            newRequest(user || owner, "admin", l, null, 0)
              .then((r) => {
                res.status(200).send({ data: l });
              })
              .catch((err) => {
                res.status(200).send({ data: err.message });
              });
          })
          .catch((err) => res.status(200).send({ data: err.message }));
      } else {
        res.status(200).send({
          status: "failed",
          data: "The land is registered to somebody else",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(200)
        .send({ data: "The Land doesn't exist", status: "failed" });
    });
};

const updateLand = (req: Request, res: Response) => {
  const {
    division,
    district,
    state,
    token,
    village,
    postOffice,
    price,
    isForSale,
  } = req.body;

  let file = req.files as Express.Multer.File[];
  let images: string[] = [];

  file.forEach((f: Express.Multer.File) => {
    images.push(f.filename as string);
  });

  if (images.length >= 1) {
    Land.updateOne(
      { token: token },
      {
        $set: {
          landImages: images,
        },
      }
    )
      .then((r) => {
        console.log("updated images");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  Land.updateOne(
    { token: token },
    {
      $set: {
        price: price,
        isForSale: isForSale,
        postOffice: postOffice,
        village: village,
        district: district,
        state: state,
        division: division,
      },
    }
  )
    .then((r) => {
      res.send({ status: "success", msg: "Updated land successfully" });
    })
    .catch((err) => {
      res.send({ status: "failed", msg: err.msg });
    });
};

const requestBuyLand = async (req: Request, res: Response) => {
  const { land, user, biddingPrice } = req.body;

  await Land.findById({ _id: land }).then((l) => {
    getUser(user).then((u) => {
      newRequest(u[0], l?.get("owner").publicId as string, l, biddingPrice, 1)
        .then((r) => {
          res.status(200).send({ data: r });
        })
        .catch((err) => {
          res.status(200).send({ data: err.message });
        });
    });
  });
};
const getLandById = (req: Request, res: Response) => {
  const { id } = req.params;

  Land.findById({ _id: id })
    .then((r) => res.status(200).send(r))
    .catch((err) => res.status(500).send({ data: err.message }));
};

const confirmAddLand = (req: Request, res: Response) => {
  const { _id, token } = req.body;
  const { rId } = req.params;

  Land.updateOne({ _id: _id }, { $set: { token: token, status: true } })
    .then(async (r) => {
      const land = await Land.find({ _id: _id });
      RequestModel.updateOne(
        { _id: rId },
        { $set: { status: 3, land: land[0] } }
      )
        .then((r) => {
          // res.send({data: r})
          console.log(r);
        })
        .catch((err) => {
          console.log(err);
          // res.send({err})
        });
      res.send({ data: r });
    })
    .catch((err) => {
      res.send({ data: err.message });
    });
};

const confirmBuyLand = async (req: Request, res: Response) => {
  const { land, request, owner } = req.body;
  const user = await getUser(owner);
  Land.updateOne({ _id: land }, { $set: { owner: user[0] } })
    .then(async (r) => {
      RequestModel.updateOne({ _id: request }, { $set: { status: 5 } })
        .then((r) => {
          // res.send({data: r})
          console.log(r);
        })
        .catch((err) => {
          console.log(err);
          // res.send({err})
        });
      res.send({ data: r });
    })
    .catch((err) => {
      res.send({ data: err.message });
    });
};
const getLandsBySearch = (req: Request, res: Response) => {
  const { token, village, propertyId, postOffice, division, district } =
    req.body;

  Land.find({
    token: { $regex: token },
    village: { $regex: village },
    propertyId: { $regex: propertyId },
    postOffice: { $regex: postOffice },
    division: { $regex: division },
    district: { $regex: district },
  })
    .then((r) => res.status(200).send(r))
    .catch((err) => res.status(500).send({ data: err.message }));
};
export {
  getAllLands,
  addLand,
  confirmAddLand,
  getLandById,
  getLandsBySearch,
  requestBuyLand,
  confirmBuyLand,
  updateLand,
};
