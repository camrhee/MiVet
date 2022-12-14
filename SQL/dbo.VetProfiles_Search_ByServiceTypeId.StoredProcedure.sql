USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[VetProfiles_Search_ByServiceTypeId]    Script Date: 10/22/2022 3:32:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Camden Rhee
-- Create date: 10/18/2022
-- Description: Search for vet profiles that match the specified servicetype id
-- Code Reviewer: 

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[VetProfiles_Search_ByServiceTypeId]
	 @PageIndex int
	,@PageSize int
	,@serviceTypeId int
as

/*

	Declare @pageIndex int = 0,
	        @pageSize int = 20,
			@serviceTypeId int = 1;

	Execute [dbo].[VetProfiles_Search_ByServiceTypeId]
				@pageIndex
			   ,@pageSize 
			   ,@serviceTypeId

*/

Begin

	Declare @offset int = @PageIndex * @PageSize

	SELECT vp.[Id]
			 ,[Services] = (
					         Select  ss.Id as serviceId
							 	    ,ss.Name as serviceName
									,sty.Id as ServiceTypeId
									,sty.Name as ServiceTypeName
							 From dbo.[Services] as ss 
							 inner join dbo.ServiceTypes as sty
							 on ss.ServiceTypeId = sty.Id
							 inner join dbo.VetServices as vs 
							 on ss.Id = vs.ServiceId and vs.VetProfileId = vp.Id
							 for JSON PATH
					       )
		  ,vp.[Bio]
		  ,vp.[Phone]
		  ,vp.[BusinessEmail]
		,vp.[DateCreated]
		,vp.[DateModified]
		,u.[Id] as UserId
		,u.[FirstName] as FirstName
		,u.[LastName] as LastName
		,u.[AvatarUrl] as UserImage
		,[Practices] = (
						Select pr.Id as PracticeId
							   ,pr.Name as PracticeName
							   ,pr.Phone as PracticePhone
							   ,pr.BusinessEmail as PracticeBusinessEmail
							   ,pr.SiteUrl as PracticeSiteUrl
						From dbo.Practices as pr
						inner join dbo.Users as u 
							on  pr.CreatedBy = u.Id
						where vp.CreatedBy = u.Id
						for JSON PATH
						)
		,l.Id as LocationId
		,lt.Id as LocationTypeId
		,lt.Name as LocationTypeName
		,l.LineOne
		,l.LineTwo
		,l.City
		,l.Zip
		,st.Id as StateId
		,st.Name as StateName
		,l.Latitude
		,l.Longitude
		,l.DateCreated
		,l.DateModified
		,l.CreatedBy
		,l.ModifiedBy as LocationModifiedBy
		,vp.[ModifiedBy]
		,vp.[IsActive]	
		,vp.[EmergencyLine]
		  ,TotalCount = COUNT(1) OVER()
	  FROM [dbo].[VetProfiles] as vp
	  inner join dbo.Users as u
	  on vp.CreatedBy = u.Id
	  left outer join dbo.Practices as pr
	  on pr.CreatedBy = u.Id
	  left outer join dbo.Locations as l
	  on l.Id = pr.LocationId
	  inner join dbo.LocationTypes as lt
	  on l.LocationTypeId = lt.Id
	  inner join dbo.States as st
	  on st.Id = l.StateId
	  --inner join dbo.VetServices as vs
	  --on vp.Id = vs.VetProfileId
	  --left outer join dbo.Services as ss
	  --on vs.ServiceId = ss.Id
	  --left outer join dbo.ServiceTypes as sty
	  --on ss.ServiceTypeId = sty.Id
	  
	  --Where [Services] is not null
	  ORDER BY vp.Id
	  
	  OFFSET @offset Rows
	  Fetch Next @PageSize Rows ONLY

End


--select * from dbo.ServiceTypes where Id in (5, 6)
--select * from dbo.VetServices
--select * from dbo.Services



GO
