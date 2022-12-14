USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[VetProfiles_Insert]    Script Date: 10/13/2022 11:34:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Camden Rhee>
-- Create date: <9/21/2022>
-- Description: <Insert proc for VetProfiles table>
-- Code Reviewer: Min Jae Kang

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[VetProfiles_Insert]
	 @Bio nvarchar(max)
	,@Phone varchar(50)
	,@BusinessEmail nvarchar(255)
	,@ScheduleId int
	,@CreatedBy int
	,@ModifiedBy int
	,@IsActive bit
	,@EmergencyLine nvarchar(50)
	,@Id int OUTPUT
as

/*
	
	Declare							 @Bio nvarchar(max) = 'Mins Test Bio'
									,@Phone varchar(50) = '888-888-8888'
									,@BusinessEmail nvarchar(255) = 'testemail@email.com'
									,@ScheduleId int = 1
									,@CreatedBy int = 35
									,@ModifiedBy int = 35
									,@IsActive bit = 1
									,@EmergencyLine nvarchar(50) = '000-000-0000'
									,@Id int
	Execute [dbo].[VetProfiles_Insert]
									 @Bio
									,@Phone
									,@BusinessEmail
									,@ScheduleId
									,@CreatedBy
									,@ModifiedBy
									,@IsActive
									,@EmergencyLine
									,@Id OUTPUT
	Select @Id
	Select *
	from dbo.VetProfiles
	Where Id = @Id
*/

Begin

	INSERT INTO [dbo].[VetProfiles]
			   ([Bio]
			   ,[Phone]
			   ,[BusinessEmail]
			   ,[ScheduleId]
			   ,[CreatedBy]
			   ,[ModifiedBy]
			   ,[IsActive]
			   ,[EmergencyLine])
		 VALUES
			   (@Bio
			   ,@Phone
			   ,@BusinessEmail
			   ,@ScheduleId
			   ,@CreatedBy
			   ,@ModifiedBy
			   ,@IsActive
			   ,@EmergencyLine)

	Set @Id = SCOPE_IDENTITY()

End


GO
