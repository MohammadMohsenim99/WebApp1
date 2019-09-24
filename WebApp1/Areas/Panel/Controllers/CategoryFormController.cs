using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApp1.Areas.Panel.Models;
namespace WebApp1.Areas.Panel.Controllers
{
    public class CategoryFormController : Controller
    {
        ShopDatabaseEntitiesNew DB = new ShopDatabaseEntitiesNew();
        // GET: Panel/CategoryForm
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult Save(TB_Category ClassCategory)
        {
            DB.TB_Category.Add(ClassCategory);
            DB.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(TB_Category ClassCategory)
        {
            var Result = DB.TB_Category.SingleOrDefault(Item => Item.ID == ClassCategory.ID);
            Result.Name = ClassCategory.Name;
            DB.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Show()
        {
            var Result = DB.TB_Category.ToList();
            return Json(Result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            var Result = DB.TB_Category.SingleOrDefault(item => item.ID == ID);
            DB.TB_Category.Remove(Result);
            DB.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveRecordBody(TB_Category ClassTbl_Emp)
        {
            DB.TB_Category.Add(ClassTbl_Emp);
            DB.SaveChanges();
            return Json(ClassTbl_Emp.ID, JsonRequestBehavior.AllowGet);
        }


        public void GetPersImageFile(int EmpID)
        {
            string ArchPersonelImageFileUrl = "";

            string SaveLocation = Server.MapPath("~/FileArchive/");
            String CurrentDate = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "-");
            foreach (string item in Request.Files)
            {

                var Filename = Request.Files[item].FileName;
                var DotPos = Filename.LastIndexOf(".");
                var FileameWithoutExtension = Filename.Substring(0, DotPos);
                var FileExtension = Filename.Substring(DotPos);
                var CurrentTime = DateTime.Now.Hour + "_" + DateTime.Now.Minute;

                var FinalPath = SaveLocation + FileameWithoutExtension + "_" + CurrentDate + "_" + CurrentTime + FileExtension;
                Request.Files[item].SaveAs(FinalPath);
                ArchPersonelImageFileUrl = FileameWithoutExtension + "_" + CurrentDate + "_" + CurrentTime + "_" + FileExtension;

            }
            //2-Save Attach Files:
            if (ArchPersonelImageFileUrl.Length > 0)
            {
                var Result = DB.TB_Category.SingleOrDefault(item => item.ID == EmpID);
                //Result.Img_Url = ArchPersonelImageFileUrl;
                DB.SaveChanges();
            }


        }
    }
}