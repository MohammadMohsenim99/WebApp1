using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApp1.Areas.Panel.Models;

namespace WebApp1.Areas.Panel.Controllers
{
    public class UserAddFormController : Controller
    {
        ShopDatabaseEntitiesNew DB = new ShopDatabaseEntitiesNew();
        // GET: Panel/UserAddForm
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult Save(TB_FUsers classUsers)
        {
            DB.TB_FUsers.Add(classUsers);
            DB.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(TB_FUsers classUsers)
        {
            var Result = DB.TB_FUsers.SingleOrDefault(item => item.ID == classUsers.ID);
            Result.FirstName = classUsers.FirstName;
            Result.LastName = classUsers.LastName;
            Result.FatherName = classUsers.FatherName;
            Result.NationalID = classUsers.NationalID;
            Result.Sex = classUsers.Sex;
            Result.BirthDate = classUsers.BirthDate;
            Result.Email = classUsers.Email;
            Result.MobileNo = classUsers.MobileNo;
            Result.Username = classUsers.Username;
            Result.Password = classUsers.Password;
            Result.MarriageStatus = classUsers.MarriageStatus;
            DB.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Show()
        {
            var Result = DB.TB_FUsers.ToList();
            return Json(Result, JsonRequestBehavior.AllowGet);
        }



        public JsonResult Delete(int ID)
        {
            var Result = DB.TB_FUsers.SingleOrDefault(item => item.ID == ID);
            DB.TB_FUsers.Remove(Result);
            DB.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult WishShow()
        {
            var Result = DB.WishViews.ToList();
            return Json(Result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult WishSave(WishList classWishList)
        {
            DB.WishLists.Add(classWishList);
            DB.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult WishDelete(int ID)
        {
            var Result = DB.WishLists.SingleOrDefault(item => item.ID == ID);
            DB.WishLists.Remove(Result);
            DB.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}