USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[VetProfiles_Delete_ById]    Script Date: 10/5/2022 2:11:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Camden Rhee
-- Create date: 9/21/2022
-- Description: Delete By Id proc for the VetProfiles table
-- Code Reviewer: Min Jae Kang

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[VetProfiles_Delete_ById]
	@Id int 
as

/*

	Declare @Id int = 11

	Select *
	From [dbo].[VetProfiles]
	WHERE Id = @Id;

	Execute [dbo].[VetProfiles_Delete_ById] @Id
	
	Select *
	From [dbo].[VetProfiles]
    WHERE Id = @Id;

*/

Begin

	Declare @dateNow datetime2 = GETUTCDATE()

	UPDATE [dbo].[VetProfiles]
	   SET [IsActive] = 0
		  ,[DateModified] = @dateNow
	WHERE Id = @Id

End


GO
