using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;


namespace TicaretApi.Controllers
{
    public class UrunController:ApiController
    {
        ticarettEntities _ent = new ticarettEntities();

        [HttpGet]
        public List<UrunTip> TumUrunleriGetir()
        {
            return _ent.Urun.Select(p => new UrunTip() { 
            
                UrunID = p.UrunID,
                UrunAdi = p.UrunAdi,
                UrunAciklama = p.UrunDetay.UrunAciklama,
                UrunFiyati = p.UrunFiyati,
                UrunStok = p.UrunStok
                
            }).ToList();
        }

        [HttpGet]
        public void UrunSil(int UrunID)
        {
            List<Sepet> urunsepetkayitlari = _ent.Sepet.Where(p => p.UrunID == UrunID).ToList();

            if(urunsepetkayitlari != null)
            {
                _ent.Sepet.RemoveRange(urunsepetkayitlari);
                _ent.SaveChanges();
            }

            _ent.Urun.Remove(_ent.Urun.Find(UrunID));
        }


        [HttpGet]
        public List<UrunTip> UrunSil2(int urunid)
        {
            try
            {
                Urun urun = _ent.Urun.Find(urunid);
                UrunDetay uu = _ent.UrunDetay.Find(urunid);
                if (urun != null && uu != null)
                {
                    _ent.UrunDetay.Remove(uu);
                    _ent.Urun.Remove(urun);
                    _ent.SaveChanges();
                }
                return TumUrunleriGetir();
            }
            catch (Exception)
            {
                return null;
            }
        }


        [HttpGet]
        public  List<Urun> UrunAra(string kelime)
        {
            _ent.Configuration.ProxyCreationEnabled = false;
            return _ent.Urun.
                Where(p => p.UrunAdi.Contains(kelime)).ToList();
        }


        [HttpPost]
        public bool UrunEkle(Urun veri)
        {
            try
            {
                _ent.Urun.Add(veri);
                _ent.SaveChanges();
                return true;
            }

            catch (Exception)
            {
                return false;
            }
        }

        [HttpGet]
        public bool UrunDetayEkle(UrunDetay veri)
        {
            try
            {
                _ent.UrunDetay.Add(veri);
                _ent.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

    }

    public class UrunTip
    {
        public int UrunID { get; set; }
        public string UrunAdi { get; set; }
        public string UrunAciklama { get; set; }
        public double UrunFiyati { get; set; }
        public int UrunStok { get; set; }
    }

}