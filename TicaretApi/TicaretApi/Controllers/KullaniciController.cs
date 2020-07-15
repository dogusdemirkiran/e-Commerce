using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace TicaretApi.Controllers
{
    public class KullaniciController:ApiController
    {

        ticarettEntities _ent = new ticarettEntities();

        [HttpGet]
        public List<KullaniciTip> TumKullanicilariGetir()
        {
            return _ent.Kullanici.Select(p => new KullaniciTip() { 
            
                KullaniciID = p.KullaniciID,
                AdSoyad = p.AdSoyad,
                Sifre = p.Sifre,
                MailAdresi = p.MailAdresi,
                Telefon = p.Telefon
            
            }).ToList();
        }


        [HttpGet]
        public int KullaniciGirisYap(string mailadresi, string sifre)
        {
            Kullanici k = _ent.Kullanici.FirstOrDefault(p => p.MailAdresi == mailadresi && p.Sifre == sifre);
            if (k == null)
                return 0;
            else
                return k.KullaniciID;
        }

        [HttpGet]
        public bool MailAdresiKullanlabilirMi(string mailadresi)
        {
            return !_ent.Kullanici.Any(p => p.MailAdresi == mailadresi);
        }


        [HttpPost]
        public bool KullaniciEkle(Kullanici veri)
        {
            try
            {
                _ent.Kullanici.Add(veri);
                _ent.SaveChanges();
                return true;
            }

            catch (Exception)
            {
                return false;
            }
        }

        [HttpPost]
        public bool KullaniciGuncelle(Kullanici veri)
        {
            try
            {
                Kullanici k = _ent.Kullanici.Find(veri.KullaniciID);
                k.AdSoyad = veri.AdSoyad;
                k.MailAdresi = veri.MailAdresi;
                k.Sifre = veri.Sifre;
                k.Telefon = veri.Telefon;
                _ent.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }


        [HttpPost]
        public bool KullaniciSifreGuncelle(int kullaniciid, string Sifre)
        {
            try
            {
                Kullanici k = _ent.Kullanici.Find(kullaniciid);
                k.Sifre = Sifre;
                _ent.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

    }

    public class KullaniciTip
    {
        public int KullaniciID { get; set; }
        public string AdSoyad { get; set; }
        public string Sifre { get; set; }
        public string MailAdresi { get; set; }
        public string Telefon { get; set; }
    }
}