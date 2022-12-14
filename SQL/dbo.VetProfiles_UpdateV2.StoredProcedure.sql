USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[VetProfiles_UpdateV2]    Script Date: 10/13/2022 11:34:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Camden Rhee
-- Create date: 9/21/2022
-- Description: Update proc for the VetProfiles table
-- Code Reviewer: Min Jae Kang

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[VetProfiles_UpdateV2]
	 @Bio nvarchar(max)
	,@Phone varchar(50)
	,@BusinessEmail nvarchar(255)
	,@ModifiedBy int
	,@IsActive bit
	,@EmergencyLine nvarchar(50)
	,@Id int OUTPUT
as
	
/*

	Declare @Id int = 8

	Declare							 @Bio nvarchar(max) = 'Updated Biography 2'
									,@Phone varchar(50) = '888-000-8888'
									,@BusinessEmail nvarchar(255) = 'testemail@email.com'
									,@ModifiedBy int = 30
									,@IsActive bit = 1
									,@EmergencyLine nvarchar(50) = '911-000-0000'
	
	Select *
	From dbo.VetProfiles
	Where Id = @Id

	Execute [dbo].[VetProfiles_Update]
									 @Bio
									,@Phone
									,@BusinessEmail
									,@ModifiedBy
									,@IsActive
									,@EmergencyLine
									,@Id OUTPUT
	Select *
	from dbo.VetProfiles
	Where Id = @Id

*/

Begin

	Declare @dateNow datetime2 = GETUTCDATE()

	UPDATE [dbo].[VetProfiles]
	   SET [Bio] = @Bio
		  ,[Phone] = @Phone
		  ,[BusinessEmail] = @BusinessEmail
		  ,[DateModified] = @dateNow
		  ,[ModifiedBy] = @ModifiedBy
		  ,[IsActive] = @IsActive
		  ,[EmergencyLine] = @EmergencyLine
	 WHERE Id = @Id
	 
End

GO
