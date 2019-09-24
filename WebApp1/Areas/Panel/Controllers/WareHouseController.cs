using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApp1.Areas.Panel.Models;
using PagedList;
namespace WebApp1.Areas.Panel.Controllers
{
    public class WareHouseController : Controller
    {
        ShopDatabaseEntitiesNew DB = new ShopDatabaseEntitiesNew();
        // GET: Panel/WareHouse
        public ActionResult Index()
        {
            
            return View();
        }
        public JsonResult Save(TB_WareHouse ClassWareHouse)
        {
            ClassWareHouse.Date = DateConvertion(DateTime.Now);
            ClassWareHouse.Time = Time();
            DB.TB_WareHouse.Add(ClassWareHouse);
            DB.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(TB_WareHouse ClassWareHouse)
        {
            var Result = DB.TB_WareHouse.SingleOrDefault(Item => Item.ID == ClassWareHouse.ID);
            Result.ProductID = ClassWareHouse.ProductID;
            Result.Price = ClassWareHouse.Price;
            Result.EntryNo = ClassWareHouse.EntryNo;
            DB.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Show()
        {
            var Result = DB.WareHouse_View.ToList();
            return Json(Result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            var Result = DB.TB_WareHouse.SingleOrDefault(item => item.ID == ID);
            DB.TB_WareHouse.Remove(Result);
            DB.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }

     
      public string  DateConvertion(System.DateTime Mdate)
        {
            string FunctionReturnValue = null;
            System.Globalization.PersianCalendar PC = new System.Globalization.PersianCalendar();
            int Sal = PC.GetYear(Mdate);
            int mah = PC.GetMonth(Mdate);
            int Rooz = PC.GetDayOfMonth(Mdate);
            int Hour = DateTime.Now.Hour;
            int Minute = DateTime.Now.Minute;
            int Second = DateTime.Now.Second;
            FunctionReturnValue = Sal.ToString("0000") + "/" + mah.ToString("00") + "/" + Rooz.ToString("00");
            return FunctionReturnValue;
        }
     public string Time()
      {
         string TimeNow = null;
         TimeNow = System.DateTime.Now.Hour.ToString("00") + ":" + System.DateTime.Now.Minute.ToString("00") + ":" +System.DateTime.Now.Second.ToString("00");
         return TimeNow;
      }
      
            
        }
    }
