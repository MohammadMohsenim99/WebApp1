using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApp1.Areas.Panel.Models;

namespace WebApp1.Areas.Panel.Controllers
{
    public class AttributesFormController : Controller
    {
        ShopDatabaseEntitiesNew DB = new ShopDatabaseEntitiesNew();
        // GET: Panel/AttributesForm
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult Save(TB_Attribute ClassAtt)
        { 
            DB.TB_Attribute.Add(ClassAtt);
            DB.SaveChanges();
            return Json(ClassAtt.ID, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(TB_Attribute ClassAtt)
        {
            var Result = DB.TB_Attribute.SingleOrDefault(Item => Item.ID == ClassAtt.ID);
            Result.Name = ClassAtt.Name;
            Result.Dimension = ClassAtt.Dimension;
            Result.Color = ClassAtt.Color;
            Result.Weigh = ClassAtt.Weigh;
            Result.PackingType = ClassAtt.PackingType;
            Result.ExtraParts = ClassAtt.ExtraParts;
          
            Result.Description = ClassAtt.Description;
            
            DB.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }


        public JsonResult Show()
        {
            var Result = DB.ShowAllAttributes.ToList();
            return Json(Result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            var Result = DB.TB_Attribute.SingleOrDefault(item => item.ID == ID);
            DB.TB_Attribute.Remove(Result);
            DB.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }

   

        public void GetPersImageFile(int EmpID)
        {
          
            string  NewFilename = "";

            string SaveLocation = Server.MapPath("~/FileArchive/");
            String CurrentDate = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "-");
            foreach (string item in Request.Files)
            {

                var Filename = Request.Files[item].FileName;
                var DotPos = Filename.LastIndexOf(".");
                var FileameWithoutExtension = Filename.Substring(0, DotPos);
                var FileExtension = Filename.Substring(DotPos);
                var CurrentTime = DateTime.Now.Hour + "_" + DateTime.Now.Minute;

                 NewFilename = FileameWithoutExtension + "_" + CurrentDate + "_" + CurrentTime + FileExtension;
                var FinalPath = SaveLocation + NewFilename;
                Request.Files[item].SaveAs(FinalPath);
               

            }
            //2-Save Attach Files:
            if (NewFilename.Length > 0)
            {
                var Result = DB.TB_Attribute.Where(item => item.ID == EmpID).ToList();
                Result[0].Img_Url = NewFilename;
                DB.SaveChanges();
            }


        }
    }
}