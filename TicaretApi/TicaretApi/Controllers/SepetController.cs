using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace TicaretApi.Controllers
{
    public class SepetController:ApiController
    {
        ticarettEntities _ent = new ticarettEntities();

        [HttpGet]
        public List<SepetTip> KullanicininSepetiniGetir(int KullaniciID)
        {
            return _ent.Sepet.Where(p => p.KullaniciID == KullaniciID)
                .Select(p => new SepetTip(){

                    UrunAdi = p.Urun.UrunAdi,
                    UrunEklemeAdedi = p.UrunEklemeAdedi,
                    ToplamFiyat = p.UrunEklemeAdedi * p.Urun.UrunFiyati,
                    KullaniciID = p.KullaniciID,
                    SepetID = p.SepetID

            }).ToList();
        }

        [HttpPost]
        public List<SepetTip> SepeteYeniKayitEkle(SepetTip veri)
        {
            try
            {
                Urun u = _ent.Urun.Find(veri.UrunID);
                Sepet s = new Sepet();
                s.KullaniciID = veri.KullaniciID;
                s.UrunID = veri.UrunID;
                //s.SepetEklemeTarihi = DateTime.Now;
                s.UrunEklemeAdedi = u.UrunStok < veri.UrunEklemeAdedi ? u.UrunStok : veri.UrunEklemeAdedi;
                _ent.Sepet.Add(s);
                _ent.SaveChanges();
                return KullanicininSepetiniGetir(veri.KullaniciID);
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        [HttpGet]
        public bool SepeteYeniKayitEkle2(int urunid, int kullaniciid, int adet)
        {
            try
            {
                Urun u = _ent.Urun.Find(urunid);
                Sepet s = new Sepet();
                s.KullaniciID = kullaniciid;
                s.UrunID = urunid;
                s.SepetEklemeTarihi = DateTime.Now;
                s.UrunEklemeAdedi = u.UrunStok < adet ? u.UrunStok : adet;
                _ent.Sepet.Add(s);
                _ent.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        [HttpGet]
        public List<SepetTip> SepetSil(int SepetID)
        {
            try
            {
                int kullaniciid = _ent.Sepet.Find(SepetID).KullaniciID;
                _ent.Sepet.Remove(_ent.Sepet.Find(SepetID));
                _ent.SaveChanges();
                return KullanicininSepetiniGetir(kullaniciid);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }

    public class SepetTip
    {
        public int SepetID { get; set; }
        public int KullaniciID { get; set; }
        public int UrunID { get; set; }
        public string UrunAdi { get; set; }
        public double ToplamFiyat { get; set; }
        public System.DateTime SepetEklemeTarihi { get; set; }
        public int UrunEklemeAdedi { get; set; }
    }

    public class newSepet
    {
        public int SepetID { get; set; }
        public int KullaniciID { get; set; }
        public int UrunID { get; set; }
        public System.DateTime SepetEklemeTarihi { get; set; }
        public int UrunEklemeAdedi { get; set; }
    }
}