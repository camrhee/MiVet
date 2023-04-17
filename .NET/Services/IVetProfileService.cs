using MiVet.Models;
using MiVet.Models.Domain.VetProfiles;
using MiVet.Models.Requests.VetProfiles;
using System;

namespace MiVet.Services.Interfaces
{
    public interface IVetProfileService
    {
        VetProfileV2 GetVetProfileById(int id);
        int AddVetProfile(VetProfileAddRequest model, int userId);
        void UpdateVetProfile(VetProfileUpdateRequest model, int userId);
        void DeleteVetProfile(int id);
        Paged<VetProfileV2> GetVetProfileByCreated(int pageIndex, int pageSize, int id);
        Paged<VetProfileV2> GetAll(int pageIndex, int pageSize);
        Paged<VetProfileV2> SearchPaginated(int pageIndex, int pageSize, string query);
        Paged<VetProfileV2> SearchByServiceTypeIdPaginated(int pageIndex, int pageSize, string query, int categoryId);
        Boolean CheckIfVetHasProfile(int id);
        Paged<VetProfileV2> GetVetProfileByPractice(int pageIndex, int pageSize, int id);
    }
}
