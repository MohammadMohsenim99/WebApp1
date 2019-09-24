using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApp1.Areas.Panel.Models;

namespace WebApp1.Controllers
{
    public class HomeController : Controller
    {
        ShopDatabaseEntitiesNew DB = new ShopDatabaseEntitiesNew();
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Show()
        {
            var Result = DB.UserShows.ToList();
            return Json(Result, JsonRequestBehavior.AllowGet);
        }
      
    }
}