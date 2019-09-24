using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApp1.Areas.Panel.Models;
namespace WebApp1.Areas.Panel.Controllers
{
    public class LoginController : Controller
    {
        public class LoginClass
        {
            public string  Username { get; set; }
            public string Password { get; set; }
        }
        ShopDatabaseEntitiesNew DB = new ShopDatabaseEntitiesNew();
        // GET: Panel/Login
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult CheckLogin(LoginClass loginClass)
        {
            var Result = DB.TB_FUsers.Where(item => item.Username == loginClass.Username && item.Password == loginClass.Password).ToList();
            if (Result.Count > 0)
            {
                return Json(Result,JsonRequestBehavior.AllowGet);
            }
            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}